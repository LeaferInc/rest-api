import { CreateSensorDto } from './sensor.dto';

describe('SensorDto', () => {
  it('should be defined', () => {
    expect(new CreateSensorDto()).toBeDefined();
  });
});
