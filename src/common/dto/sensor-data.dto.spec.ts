import { CreateSensorDataDto } from './sensor-data.dto';

describe('SensorDataDto', () => {
  it('should be defined', () => {
    expect(new CreateSensorDataDto()).toBeDefined();
  });
});