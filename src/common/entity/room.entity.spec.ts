import { RoomEntity } from './room.entity';

describe('Room', () => {
  it('should be defined', () => {
    expect(new RoomEntity()).toBeDefined();
  });
});
