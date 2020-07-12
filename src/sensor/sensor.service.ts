import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SensorEntity } from 'src/common/entity/sensor.entity';
import { Repository } from 'typeorm';
import { CreateSensorDto, UpdateSensorDto } from 'src/common/dto/sensor.dto';
import { PlantCollectionEntity } from 'src/common/entity/plant-collection.entity';
import { PlantCollectionService } from 'src/plant-collection/plant-collection.service';

@Injectable()
export class SensorService {
  constructor(
    @InjectRepository(SensorEntity)
    private sensorRepository: Repository<SensorEntity>,
    private plantCollectionService: PlantCollectionService
  ) { }

  async create(sensorDto: CreateSensorDto, user: Express.User): Promise<SensorEntity> {
    let sensor = await this.sensorRepository.findOne({
      where: {
        plantCollection: {
          id: sensorDto.plantCollectionId
        }
      }
    });

    if (sensor) {
      return sensor;
    }
    sensor = new SensorEntity();
    const plantCollectionEntity: PlantCollectionEntity = await this.plantCollectionService.findByPlantAndUser(user.userId, sensorDto.plantCollectionId);
    sensor.plantCollection = plantCollectionEntity;
    sensor.humidity = 0;
    return this.sensorRepository.save(sensor);
  }

  async update(updateSensorDto: UpdateSensorDto, user: Express.User): Promise<SensorEntity> {
    const sensorEntity = await this.sensorRepository.findOne({
      where: {
        plantCollection: {
          id: updateSensorDto.plantCollectionId
        }
      }
    });
    await this.sensorRepository.update(sensorEntity.id, { humidity: updateSensorDto.humidity });
    return this.sensorRepository.findOne(sensorEntity.id);
  }

  async getSensorByPlantCollectionId(userId: number, plantCollectionId: number): Promise<SensorEntity> {
    return this.sensorRepository.findOne({
      where: {
        plantCollection: { id: plantCollectionId }
      }
    });
  }
}
