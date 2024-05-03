import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthEntity } from "./entities/auth.entity";
import { LoginDto } from "./dto/login.dto";
import { AuthGuard } from "./auth.guard";
import { GetCurrentUser } from "../decorators/get-current-user.decorator";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<AuthEntity> {
    return await this.authService.login(loginDto);
  }

  @UseGuards(AuthGuard)
  @Post("logout")
  @HttpCode(HttpStatus.OK)
  async logout(@GetCurrentUser("jti") jti: string): Promise<void> {
    return await this.authService.logout(jti);
  }

  @UseGuards(AuthGuard)
  @Post("refresh-token")
  @HttpCode(HttpStatus.OK)
  async refreshTokens(@GetCurrentUser("sub") userId: number, @GetCurrentUser("jti") jti: string): Promise<AuthEntity> {
    return await this.authService.refreshTokens(userId, jti);
  }
}
