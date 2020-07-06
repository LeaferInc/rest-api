import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { NotificationEntity } from 'src/common/entity/notification.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/common/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { NotificationGateway } from './notification.gateway';
import { JwtCommonModule } from 'src/jwt-common/jwt-common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NotificationEntity,
      UserEntity
    ]),
    JwtCommonModule,
  ],
  controllers: [NotificationController],
  providers: [NotificationService, UserService, NotificationGateway],
  exports: [NotificationService]
})
export class NotificationModule {}
