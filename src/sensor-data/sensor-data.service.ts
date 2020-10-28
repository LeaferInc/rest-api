import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isValid } from 'date-fns';
import { ResultData } from 'src/common/dto/query.dto';
import { CreateSensorDataDto, SensorDataDto } from 'src/common/dto/sensor-data.dto';
import { SensorDto } from 'src/common/dto/sensor.dto';
import { SensorDataEntity } from 'src/common/entity/sensor-data.entity';
import { SensorEntity } from 'src/common/entity/sensor.entity';
import { SensorService } from 'src/sensor/sensor.service';
import { FindManyOptions, FindOneOptions, getRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { SensorDataGateway } from './sensor-data.gateway';

@Injectable()
export class SensorDataService {
    constructor(
        @InjectRepository(SensorDataEntity)
        private sensorDataRepository: Repository<SensorDataEntity>,
        private sensorService: SensorService,
        private sensorDataGateway: SensorDataGateway,
    ) { }

    async create(sensorDataDto: CreateSensorDataDto, user: Express.User): Promise<SensorDataEntity> {
        let sensorData = new SensorDataEntity();
        const sensorEntity: SensorEntity = await this.sensorService.findById(sensorDataDto.sensorId);
        if(!sensorEntity) {
          throw new BadRequestException("Sensor not found");
        }
        if(!sensorEntity.enabled){
          throw new BadRequestException("Sensor disabled");
        }
        sensorData.sensor = sensorEntity;
        sensorData.groundHumidity = sensorDataDto.groundHumidity;
        sensorData.airHumidity = sensorDataDto.airHumidity;
        sensorData.temperature = sensorDataDto.temperature;
        const sensorDataSaved = await this.sensorDataRepository.save(sensorData);
        this.sensorDataGateway.sendSensorData(sensorDataSaved);
        return sensorDataSaved;
    }

    async getDataFromId(sensorId: number, user: Express.User): Promise<ResultData<SensorDataDto>> {
        const queryOptions: FindManyOptions<SensorDataEntity> = {
            where: {
                sensorId: sensorId
            },
            order: {
                createdAt: "ASC"
            }
        };
        const[items, count] = await this.sensorDataRepository.findAndCount(queryOptions);
        return {items: items.map((s: SensorDataEntity) => s.toDto()), count};
    }

    getAllDataByUser(userId: number, start?: Date, end?: Date) {
      const query: SelectQueryBuilder<SensorDataEntity> = getRepository(SensorDataEntity)
        .createQueryBuilder('sd')
        .innerJoin('sd.sensor', 'sensor')
        .innerJoin('sensor.plantCollection', 'pc')
        .innerJoin('pc.user', 'user')
        .where('user.id = :userId', { userId: userId });

      if(start && isValid(start)) query.andWhere('sd.createdAt >= :start', { start });
      if(end && isValid(end)) query.andWhere('sd.createdAt <= :end', { end });

      return query
        .orderBy('sd.createdAt', 'ASC')
        .getMany();
    }

    async getLastDataFromId(sensor: SensorDto, user: Express.User): Promise<SensorDataDto> {
        const queryOptions: FindOneOptions<SensorDataEntity> = {
            where: {
                sensorId: sensor.id
            },
            order: {
                createdAt: "DESC"
            }
        };
        const item = await this.sensorDataRepository.findOne(queryOptions);
        return item.toDto();
    }
}
