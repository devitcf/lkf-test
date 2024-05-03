import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthEntity } from "./entities/auth.entity";
import { LoginDto } from "./dto/login.dto";
import { AuthGuard } from "./auth.guard";
import { GetCurrentUser } from "../decorators/get-current-user.decorator";
import { TokenType } from "../decorators/token-type-decorator";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<AuthEntity> {
    return await this.authService.login(loginDto);
  }

  @UseGuards(AuthGuard)
  @TokenType("refreshToken")
  @Post("logout")
  @HttpCode(HttpStatus.OK)
  async logout(@GetCurrentUser("jti") jti: string): Promise<void> {
    return await this.authService.logout(jti);
  }

  @UseGuards(AuthGuard)
  @TokenType("refreshToken")
  @Post("refresh-token")
  @HttpCode(HttpStatus.OK)
  async refreshToken(@GetCurrentUser("sub") userId: number, @GetCurrentUser("jti") jti: string): Promise<AuthEntity> {
    return await this.authService.refreshToken(userId, jti);
  }
}
