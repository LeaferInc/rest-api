import { Test, TestingModule } from '@nestjs/testing';
import { PlantCollectionService } from './plant-collection.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PlantCollectionEntity } from 'src/common/entity/plant-collection.entity';
import { UserService } from 'src/user/user.service';
import { PlantService } from 'src/plant/plant.service';
import { UserServiceMock } from 'src/mocks/services/user.service.mock';

describe('PlantCollectionService', () => {
  let service: PlantCollectionService;
  const repositoryMock = {
    save: jest.fn(),
    findOneOrFail: jest.fn(),
    delete: jest.fn(),
  };
  const plantServiceMock = {
    findOne: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlantCollectionService,
        { provide: getRepositoryToken(PlantCollectionEntity) , useValue: repositoryMock },
        { provide: UserService, useClass: UserServiceMock},
        { provide: PlantService, useValue: plantServiceMock },
      ],
    }).compile();

    service = module.get<PlantCollectionService>(PlantCollectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
