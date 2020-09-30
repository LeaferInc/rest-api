import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorDataEntity } from 'src/common/entity/sensor-data.entity';
import { SensorModule } from 'src/sensor/sensor.module';
import { SensorDataController } from './sensor-data.controller';
import { SensorDataService } from './sensor-data.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([SensorDataEntity]),
        SensorModule
    ],
    controllers: [SensorDataController],
    providers: [SensorDataService],
    exports: [SensorDataService],
})
export class SensorDataModule {}
