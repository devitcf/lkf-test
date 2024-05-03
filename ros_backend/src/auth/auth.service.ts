import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as argon2 from "argon2";
import { v4 as uuidv4 } from "uuid";
import { PrismaService } from "../prisma/prisma.service";
import { UserService } from "../user/user.service";
import { LoginDto } from "./dto/login.dto";
import { AuthEntity } from "./entities/auth.entity";
import { User } from "../user/entities/user.entity";
import { Jwt } from "../customer/entities/jwt.entity";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private configService: ConfigService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<AuthEntity> {
    const { username, password } = loginDto;
    const user = await this.userService.findUserByUsername(username);

    if (!user) {
      throw new UnauthorizedException({ message: "Incorrect username or password" });
    }
    const passwordMatches = await argon2.verify(user?.password, password);
    if (!passwordMatches) {
      throw new UnauthorizedException({ message: "Incorrect username or password" });
    }

    const tokens = await this.generateTokens(user);
    await this.saveActiveRefreshToken(tokens.refreshToken);
    return tokens;
  }

  async logout(jti: string): Promise<void> {
    const activeRefreshToken = await this.prisma.activeRefreshToken.findFirst({
      where: { jti },
    });
    if (!activeRefreshToken) {
      throw new UnauthorizedException({ message: "Access denied" });
    }

    await this.prisma.activeRefreshToken.delete({ where: { jti } });
  }

  private async generateTokens(user: User): Promise<AuthEntity> {
    const jti = uuidv4();
    const jwtPayload: Jwt = {
      sub: user.id,
      jti,
      username: user.username,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>("jwt.accessTokenSecret"),
        expiresIn: this.configService.get<string>("jwt.accessTokenExpiresIn"),
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>("jwt.refreshTokenSecret"),
        expiresIn: this.configService.get<string>("jwt.refreshTokenExpiresIn"),
      }),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }

  private async saveActiveRefreshToken(refreshToken: string): Promise<void> {
    const { sub, jti, exp } = this.jwtService.decode(refreshToken);

    await this.prisma.activeRefreshToken.upsert({
      where: { jti },
      create: { sub, jti, expiresAt: new Date(exp * 1000) },
      update: {},
    });
  }

  async refreshToken(userId: number, jti: string): Promise<AuthEntity> {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new UnauthorizedException({ message: "Access denied" });
    }
    const activeRefreshToken = await this.prisma.activeRefreshToken.findFirst({
      where: { jti },
    });
    if (!activeRefreshToken) {
      throw new UnauthorizedException({ message: "Access denied" });
    }

    await this.prisma.activeRefreshToken.delete({ where: { jti } });

    const tokens = await this.generateTokens(user);
    await this.saveActiveRefreshToken(tokens.refreshToken);
    return tokens;
  }
}
