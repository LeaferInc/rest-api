import { Test, TestingModule } from '@nestjs/testing';
import { SensorDataController } from './sensor-data.controller';
import { SensorDataService } from './sensor-data.service';

describe('SensorData Controller', () => {
  let controller: SensorDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: SensorDataService, useValue: {} }
      ],
      controllers: [SensorDataController],
    }).compile();

    controller = module.get<SensorDataController>(SensorDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
