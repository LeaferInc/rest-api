import { Module } from '@nestjs/common';
import { AuthentificationService } from './authentification.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthentificationController } from './authentification.controller';

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthentificationService, LocalStrategy],
  controllers: [AuthentificationController]
})
export class AuthentificationModule {}
