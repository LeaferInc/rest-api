import { Controller, UseGuards, Post, Request, Get } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiBody, ApiProperty } from '@nestjs/swagger';

class Login {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @ApiBody({ type: Login })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return { user: req.user, token: this.authService.login(req.user) };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Request() req: Express.Request) {
    return this.authService.me(req.user.userId);
  }
}
