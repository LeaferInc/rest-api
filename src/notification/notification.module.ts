import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationGateway } from './notification.gateway';
import { JwtCommonModule } from 'src/jwt-common/jwt-common.module';
import { UserModule } from 'src/user/user.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SensorModule } from 'src/sensor/sensor.module';
import { NotificationAlertEntity } from 'src/common/entity/notification-alert.entity';
import { NotificationMessageEntity } from 'src/common/entity/notification-message.entity';
import { NotificationEntity } from 'src/common/entity/notification.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NotificationEntity,
      NotificationAlertEntity,
      NotificationMessageEntity,
    ]),
    JwtCommonModule,
    UserModule,
    ScheduleModule.forRoot(),
    SensorModule,
  ],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationGateway],
  exports: [NotificationService]
})
export class NotificationModule {}
