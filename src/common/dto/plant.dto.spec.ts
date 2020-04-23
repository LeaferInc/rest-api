import { CreatePlantDto } from './plant.dto';

describe('PlantDto', () => {
  it('should be defined', () => {
    expect(new CreatePlantDto()).toBeDefined();
  });
});
