import { CreatePlantCollectionDto } from './plant-collection.dto';

describe('PlantCollection', () => {
  it('should be defined', () => {
    expect(new CreatePlantCollectionDto()).toBeDefined();
  });
});
