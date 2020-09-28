import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSensorDataDto } from 'src/common/dto/sensor-data.dto';
import { SensorDataEntity } from 'src/common/entity/sensor-data.entity';
import { SensorEntity } from 'src/common/entity/sensor.entity';
import { SensorService } from 'src/sensor/sensor.service';
import { Repository } from 'typeorm';

@Injectable()
export class SensorDataService {
    constructor(
        @InjectRepository(SensorDataEntity)
        private sensorDataRepository: Repository<SensorDataEntity>,
        private sensorService: SensorService
    ) { }

    async create(sensorDataDto: CreateSensorDataDto, user: Express.User): Promise<SensorDataEntity> {
        let sensorData = new SensorDataEntity();
        const sensorEntity: SensorEntity = await this.sensorService.findById(sensorDataDto.sensorId);
        sensorData.sensor = sensorEntity;
        sensorData.humidity = sensorDataDto.humidity;
        return this.sensorDataRepository.save(sensorData);
    }
}
