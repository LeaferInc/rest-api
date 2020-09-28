import { Module } from '@nestjs/common';
import { SensorController } from './sensor.controller';
import { SensorService } from './sensor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorEntity } from 'src/common/entity/sensor.entity';
import { PlantCollectionModule } from 'src/plant-collection/plant-collection.module';
import { SensorGateway } from './sensor.gateway';
import { JwtCommonModule } from 'src/jwt-common/jwt-common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SensorEntity]),
    PlantCollectionModule,
    JwtCommonModule,
  ],
  controllers: [SensorController],
  providers: [SensorService, SensorGateway],
  exports: [SensorService],
})
export class SensorModule { }
