import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorDataEntity } from 'src/common/entity/sensor-data.entity';
import { JwtCommonModule } from 'src/jwt-common/jwt-common.module';
import { PlantCollectionModule } from 'src/plant-collection/plant-collection.module';
import { SensorModule } from 'src/sensor/sensor.module';
import { UserModule } from 'src/user/user.module';
import { SensorDataController } from './sensor-data.controller';
import { SensorDataGateway } from './sensor-data.gateway';
import { SensorDataService } from './sensor-data.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([SensorDataEntity]),
        SensorModule,
        JwtCommonModule,
        PlantCollectionModule,
        UserModule,
    ],
    controllers: [SensorDataController],
    providers: [SensorDataService, SensorDataGateway],
    exports: [SensorDataService],
})
export class SensorDataModule {}
