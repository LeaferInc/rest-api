import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { SensorDataGateway } from './sensor-data.gateway';

describe('SensorGateway', () => {
  let gateway: SensorDataGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SensorDataGateway,
        { provide: JwtService, useValue: {} }
      ],
    }).compile();

    gateway = module.get<SensorDataGateway>(SensorDataGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
