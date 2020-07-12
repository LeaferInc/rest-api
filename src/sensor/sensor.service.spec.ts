import { Test, TestingModule } from '@nestjs/testing';
import { SensorService } from './sensor.service';
import { SensorEntity } from 'src/common/entity/sensor.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PlantCollectionService } from 'src/plant-collection/plant-collection.service';

describe('SensorService', () => {
  let service: SensorService;
  const repositoryMock = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SensorService,
        {
          provide: getRepositoryToken(SensorEntity),
          useValue: repositoryMock
        },
        { provide: PlantCollectionService, useValue: {} }
      ],
    }).compile();

    service = module.get<SensorService>(SensorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
