/**
 * @author ddaninthe
 */

import { EventEntity } from './event.entity';
import { UserEntity } from './user.entity';

describe('Event', () => {
  it('should be defined', () => {
    expect(new EventEntity()).toBeDefined();
  });

  it('should parse to dto', () => {
    const event = new EventEntity();
    const user = new UserEntity();
    user.id = 1;

    event.id = 1;
    event.name = 'Test event';
    event.description = 'Description for testing';
    event.location = '76, Test St.';
    event.startDate = new Date(2020, 3, 13, 10);
    event.endDate = new Date(2020, 3, 10, 16);
    event.price = 5;
    event.maxPeople = 20;
    event.latitude = 46.7887;
    event.longitude = 5.1256;

    let dto = event.toDto();
    expect(dto.id).toBe(1);
    expect(dto.name).toBe('Test event');
    expect(dto.joined).toBeUndefined();
    expect(dto.organizer).toBeUndefined();

    event.organizer = user;
    event.joined = true;
    dto = event.toDto();
    expect(dto.joined).toBe(true);
    expect(dto.organizer).toBe(user.id);
  });
});
