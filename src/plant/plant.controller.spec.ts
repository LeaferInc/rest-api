import { Test, TestingModule } from '@nestjs/testing';
import { PlantController } from './plant.controller';
import { PlantService } from './plant.service';

describe('Plant Controller', () => {
  let controller: PlantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: PlantService, useValue: {} }
      ],
      controllers: [PlantController],
    }).compile();

    controller = module.get<PlantController>(PlantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
