import { Module } from '@nestjs/common';
import { SensorController } from './sensor.controller';
import { SensorService } from './sensor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorEntity } from 'src/common/entity/sensor.entity';
import { PlantCollectionModule } from 'src/plant-collection/plant-collection.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SensorEntity]),
    PlantCollectionModule
  ],
  controllers: [SensorController],
  providers: [SensorService],
  exports: [SensorService],
})
export class SensorModule { }
