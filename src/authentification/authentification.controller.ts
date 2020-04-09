import { Controller, UseGuards, Post, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthentificationGuard } from './local-authentification.guard';

@Controller('auth')
export class AuthentificationController {

  @UseGuards(LocalAuthentificationGuard)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }

}
