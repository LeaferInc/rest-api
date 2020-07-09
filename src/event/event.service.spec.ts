/**
 * @author ddaninthe
 */

import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from './event.service';
import { UserService } from 'src/user/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EventEntity } from 'src/common/entity/event.entity';
import { eventRepositoryMock } from 'src/mocks/repositories/event.repository.mock';
import { UserServiceMock } from 'src/mocks/services/user.service.mock';
import { CreateEventDto } from 'src/common/dto/event.dto';
import { NotFoundException } from '@nestjs/common';
import { ImageService } from 'src/image/image.service';
import { ImageServiceMock } from 'src/mocks/services/image.service.mock';

describe('EventService', () => {
  let service: EventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventService,
        {
          provide: ImageService, useValue: ImageServiceMock.mock
        },
        {
          provide: UserService,
          useValue: UserServiceMock.mock
        },
        {
          provide: getRepositoryToken(EventEntity),
          useValue: eventRepositoryMock,
        }
      ],
    }).compile();

    service = module.get<EventService>(EventService);
  });

  beforeEach(() => {
    UserServiceMock.setup();
    ImageServiceMock.setup();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all', async () => {
    const events: EventEntity[] = await service.findAll();
    expect(events).toHaveLength(2);
    expect(events[0].name).toBe('Test event');
    expect(events[1].name).toBe('Another Test event');
  });

  it('should find one event for user', async () => {
    const event: EventEntity = await service.findOneForUser(1, 1);
    expect(event).toBeTruthy();
    expect(event.id).toBe(1);
    expect(event.name).toBe('Test event');
    expect(event.joined).toBe(true);
  });

  it('should create an event', async () => {
    const dto: CreateEventDto = new CreateEventDto();
    dto.name = 'Event name';
    dto.description = 'Event description';
    dto.location = '76, Test St.';
    dto.startDate = new Date(2020, 3, 13, 10);
    dto.endDate = new Date(2020, 3, 10, 16);
    dto.price = 5;
    dto.maxPeople = 20;
    dto.latitude = 46.7887;
    dto.longitude = 5.1256;
    dto.picture = '';

    const event: EventEntity = await service.createOne(dto, 1);
    expect(event).toBeTruthy();
    expect(event.organizer.id).toBe(1);
    expect(event.organizer.firstname).toBe('John');
  });

  it('should throw a not found exception', async () => {
    try {
      await service.findOneForUser(219219, 1);
      expect(true).toBe(false);
    } catch(e) {
      expect(e).toBeInstanceOf(NotFoundException);
    }
  });

  it('should return the closest event', async () => {
    const lat = 46.789637;
    const long = 5.126527;
    const closestEvents = await service.findClosest(lat, long);
    expect(closestEvents).toHaveLength(1);
    expect(closestEvents[0].id).toBe(1);
  });
});
