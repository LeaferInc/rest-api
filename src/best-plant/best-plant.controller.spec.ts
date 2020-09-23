import { Test, TestingModule } from '@nestjs/testing';
import { BestPlantController } from "./best-plant.controller";
import { BestPlantService } from "./best-plant.service";

describe('Entry Controller', () => {
    let controller: BestPlantController;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [BestPlantController],
        providers: [
          {
            provide: BestPlantService,
            useValue: { findBestPlant: jest.fn() }
          }
        ]
      }).compile();
  
      controller = module.get<BestPlantController>(BestPlantController);
    });
  
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
});