import { Test, TestingModule } from '@nestjs/testing';
import { PlantCollectionController } from './plant-collection.controller';
import { PlantCollectionService } from './plant-collection.service';

describe('PlantCollection Controller', () => {
  let controller: PlantCollectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlantCollectionController],
      providers: [
        { provide: PlantCollectionService, useValue: {} }
      ],
    }).compile();

    controller = module.get<PlantCollectionController>(PlantCollectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
