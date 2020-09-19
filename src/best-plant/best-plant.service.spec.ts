import { Test, TestingModule } from '@nestjs/testing';
import { BestPlantService } from "./best-plant.service";
import { getRepositoryToken } from '@nestjs/typeorm';
import { BestPlantEntity } from 'src/common/entity/best-plant.entity';

describe('BestPlantService', () => {
  let service: BestPlantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: BestPlantService, useValue: { setup: jest.fn(), },
        },
        {
          provide: getRepositoryToken(BestPlantEntity),
          useValue: {},
        }
      ],
    }).compile();

    service = module.get<BestPlantService>(BestPlantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});