import { Test, TestingModule } from '@nestjs/testing';
import { SensorController } from './sensor.controller';
import { SensorService } from './sensor.service';

describe('Sensor Controller', () => {
  let controller: SensorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: SensorService, useValue: {} }
      ],
      controllers: [SensorController],
    }).compile();

    controller = module.get<SensorController>(SensorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
