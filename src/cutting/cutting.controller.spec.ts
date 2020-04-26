import { Test, TestingModule } from '@nestjs/testing';
import { CuttingController } from './cutting.controller';
import { CuttingService } from './cutting.service';

describe('Cutting Controller', () => {
  let controller: CuttingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CuttingController],
      providers: [
        { provide: CuttingService, useValue: {} }
      ]
    }).compile();

    controller = module.get<CuttingController>(CuttingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
