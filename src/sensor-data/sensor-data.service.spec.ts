import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SensorDataEntity } from 'src/common/entity/sensor-data.entity';
import { SensorDataService } from './sensor-data.service';

describe('SensorDataService', () => {
  let service: SensorDataService;
  const repositoryMock = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SensorDataService,
        {
          provide: getRepositoryToken(SensorDataEntity),
          useValue: repositoryMock
        },
        { provide: SensorDataService, useValue: {} }
      ],
    }).compile();

    service = module.get<SensorDataService>(SensorDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
