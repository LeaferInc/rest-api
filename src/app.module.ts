import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { EventModule } from './event/event.module';
import Joi = require('@hapi/joi');
import { UserEntity } from './common/entity/user.entity';
import { EventEntity } from './common/entity/event.entity';
import { AuthModule } from './auth/auth.module';
import { LocationModule } from './location/location.module';
import { PlantEntity } from './common/entity/plant.entity';
import { PlantModule } from './plant/plant.module';
import { CuttingModule } from './cutting/cutting.module';
import { CuttingEntity } from './common/entity/cutting.entity';
import { MessageEntity } from './common/entity/message.entity';
import { MessageModule } from './message/message.module';
import { RoomModule } from './room/room.module';
import { ParticipantModule } from './participant/participant.module';
import { RoomEntity } from './common/entity/room.entity';
import { ParticipantEntity } from './common/entity/participant.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { JwtCommonModule } from './jwt-common/jwt-common.module';
import { PlantCollectionModule } from './plant-collection/plant-collection.module';
import { PlantCollectionEntity } from './common/entity/plant-collection.entity';
import { NotificationModule } from './notification/notification.module';
import { NotificationEntity } from './common/entity/notification.entity';
import { AdminModule } from './admin/admin.module';
import { SensorModule } from './sensor/sensor.module';
import { SensorEntity } from './common/entity/sensor.entity';
import { PaymentModule } from './payment/payment.module';
import { SensorDataController } from './sensor-data/sensor-data.controller';
import { SensorDataService } from './sensor-data/sensor-data.service';
import { SensorDataModule } from './sensor-data/sensor-data.module';
import { SensorDataEntity } from './common/entity/sensor-data.entity';
import { RecognitionModule } from './recognition/recognition.module';
import { BestPlantModule } from './best-plant/best-plant.module';
import { BestPlantEntity } from './common/entity/best-plant.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        './src/environments/.env',
        process.env.NODE_ENV === 'production'
          ? './src/environments/.env.production'
          : './src/environments/.env.development',
      ],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        DB_HOST: Joi.string().default('localhost'),
        DB_PORT: Joi.number().default(5432),
        DB_USERNAME: Joi.string().default('postgres'),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().default('leafer'),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      // logging: true,
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        UserEntity,
        EventEntity,
        PlantEntity,
        CuttingEntity,
        MessageEntity,
        RoomEntity,
        ParticipantEntity,
        PlantCollectionEntity,
        SensorEntity,
        SensorDataEntity
        BestPlantEntity,
        NotificationEntity,
      ],
      // synchronize: process.env.NODE_ENV === 'development' ? true : false,
      synchronize: true, // disable this when release
      namingStrategy: new SnakeNamingStrategy(),
      // logging: true,
    }),
    CommonModule,
    UserModule,
    EventModule,
    AuthModule,
    LocationModule,
    PlantModule,
    CuttingModule,
    MessageModule,
    ParticipantModule,
    RoomModule,
    JwtCommonModule,
    PlantCollectionModule,
    NotificationModule,
    AdminModule,
    RecognitionModule,
    SensorModule,
    SensorDataModule,
    PaymentModule,
    BestPlantModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
