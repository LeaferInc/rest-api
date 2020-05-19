import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret
    }),
  ],
  exports: [
    JwtModule
  ]
})
export class JwtCommonModule {}
