import { EventDto } from './event.dto';
import { EventEntity } from '../entity/event.entity';

describe('EventDto', () => {
  it('should be defined', () => {
    expect(new EventDto()).toBeDefined();
  });

  it('should convert a dto to an entity', () => {
    const startDate: Date = new Date(2020, 10, 5, 10);
    const endDate: Date = new Date(2020, 10, 6, 5);
    const dto: EventDto = new EventDto();
    dto.name = "Name";
    dto.description = "Description";
    dto.location = "Location";
    dto.startDate = startDate;
    dto.endDate = endDate;
    dto.latitude = 45.131;
    dto.longitude = 3.567;
    dto.price = 4.5;
    dto.maxPeople = 20;

    const converted: EventEntity = dto.toEntity();

    expect(converted).toBeDefined();
    expect(converted.name).toBe("Name");
    expect(converted.description).toBe("Description");
    expect(converted.location).toBe("Location");
    expect(converted.startDate).toBe(startDate);
    expect(converted.endDate).toBe(endDate);
    expect(converted.latitude).toBe(45.131);
    expect(converted.longitude).toBe(3.567);
    expect(converted.price).toBe(4.5);
    expect(converted.maxPeople).toBe(20);
  });
});
