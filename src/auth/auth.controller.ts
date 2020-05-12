import { Controller, UseGuards, Post, Request, Get } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserDto } from 'src/common/dto/user.dto';

@UseGuards(LocalAuthGuard)
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Request() req) {
    return { user: req.user, token: this.authService.login(req.user as UserDto) };
  }

  @Get('me')
  me(@Request() req: Express.Request) {
    return this.authService.me(req.user.userId);
  }

  /**
   * Testing purpose only
   * @param req 
   */
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  
}
