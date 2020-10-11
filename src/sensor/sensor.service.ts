import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SensorEntity } from 'src/common/entity/sensor.entity';
import { Repository } from 'typeorm';
import { CreateSensorDto, SensorDto } from 'src/common/dto/sensor.dto';
import { PlantCollectionEntity } from 'src/common/entity/plant-collection.entity';
import { PlantCollectionService } from 'src/plant-collection/plant-collection.service';
import { ResultData } from 'src/common/dto/query.dto';

@Injectable()
export class SensorService {
  constructor(
    @InjectRepository(SensorEntity)
    private sensorRepository: Repository<SensorEntity>,
    private plantCollectionService: PlantCollectionService,
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
      if(!sensor.enabled){
        sensor.enabled = true;
        return this.sensorRepository.save(sensor);
      }
      return sensor;
    }
    sensor = new SensorEntity();
    const plantCollectionEntity: PlantCollectionEntity = await this.plantCollectionService.findById(sensorDto.plantCollectionId);
    sensor.plantCollection = plantCollectionEntity;
    return this.sensorRepository.save(sensor);
  }

  // async update(updateSensorDto: UpdateSensorDto, user: Express.User): Promise<SensorEntity> {
  //   const sensorEntity = await this.sensorRepository.findOne({
  //     where: {
  //       plantCollection: {
  //         id: updateSensorDto.plantCollectionId
  //       }
  //     }
  //   });
  //   await this.sensorRepository.update(sensorEntity.id, { humidity: updateSensorDto.humidity });
  //   return this.sensorRepository.findOne(sensorEntity.id);
  // }

  async getSensorByPlantCollectionId(userId: number, plantCollectionId: number): Promise<SensorEntity> {
    return this.sensorRepository.findOne({
      where: {
        plantCollection: { id: plantCollectionId }
      }
    });
  }

  async findById(sensorId: number): Promise<SensorEntity> {
    return this.sensorRepository.findOne({
      where: {
        id: sensorId
      }
    });
  }

  async findAll(): Promise<ResultData<SensorDto>> {
    const[items, count] = await this.sensorRepository.findAndCount({
      where: {
        enabled: true
      }
    });
    return {items: items.map((s: SensorEntity) => s.toDto()), count}
  }

  async desync(sensordId: number): Promise<SensorEntity> {
    let sensor = await this.sensorRepository.findOne({
      where:{
        id: sensordId,
        enabled: true
      }
    });
    sensor.enabled = false;
    return this.sensorRepository.save(sensor);
  }
}
