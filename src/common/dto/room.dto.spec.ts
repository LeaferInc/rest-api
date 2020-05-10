import { RoomDto } from './room.dto';

describe('Room', () => {
  it('should be defined', () => {
    expect(new RoomDto()).toBeDefined();
  });
});
