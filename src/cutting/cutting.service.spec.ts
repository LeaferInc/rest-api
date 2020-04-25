import { Test, TestingModule } from '@nestjs/testing';
import { CuttingService } from './cutting.service';

describe('CuttingService', () => {
  let service: CuttingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CuttingService],
    }).compile();

    service = module.get<CuttingService>(CuttingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
