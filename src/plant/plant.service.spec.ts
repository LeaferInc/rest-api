import { Test, TestingModule } from '@nestjs/testing';
import { PlantService } from './plant.service';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

describe('PlantService', () => {
  let service: PlantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlantService,
        {
          provide: UserService,
          useValue: {}
        },
        {
          provide: 'PlantEntityRepository',
          useClass: Repository
        }
      ],
    }).compile();

    service = module.get<PlantService>(PlantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
