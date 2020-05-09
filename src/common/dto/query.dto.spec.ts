import { Pagination } from './query.dto';

describe('Pagination', () => {
  it('should be defined', () => {
    expect(new Pagination()).toBeDefined();
  });
});
