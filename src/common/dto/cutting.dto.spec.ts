import { CreateCuttingDto } from './cutting.dto';

describe('Cutting', () => {
  it('should be defined', () => {
    expect(new CreateCuttingDto()).toBeDefined();
  });
});
