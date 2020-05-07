import { Test, TestingModule } from '@nestjs/testing';
import { EntryService } from './entry.service';
import { UserService } from 'src/user/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EventEntity } from 'src/common/entity/event.entity';
import { EventService } from 'src/event/event.service';
import { EventServiceMock } from 'src/mocks/services/event.service.mock';
import { UserServiceMock } from 'src/mocks/services/user.service.mock';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

describe('EntryService', () => {
  let service: EntryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EntryService,
        {
          provide: EventService,
          useValue: EventServiceMock.mock
        },
        {
          provide: UserService,
          useValue: UserServiceMock.mock
        },
        {
          provide: getRepositoryToken(EventEntity),
          useFactory: () => ({
            save: jest.fn((event) => event)
          })
        }
      ],
    }).compile();

    service = module.get<EntryService>(EntryService);
  });

  beforeEach(() => {
    UserServiceMock.setup();
    EventServiceMock.setup();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should join a user to an event', async () => {
    const event = await service.joinEvent(2, 1);
    expect(event.entrants).toStrictEqual([UserServiceMock.testUser]);
  });

  it('should throw error when join a full event', async () => {
    EventServiceMock.testEvent1.maxPeople = 0;
    try {
      await service.joinEvent(1, 1);
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(ForbiddenException);
      expect(error).toHaveProperty('message', 'The places limit of 0 has been reached');
    }
  });

  it('should throw an error when event is not found', async () => {
    try {
      await service.joinEvent(323, 1);
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('should unjoin a user to an event', async () => {
    const event = await service.unjoinEvent(1, 1);
    expect(event.entrants).toHaveLength(0);
  });

  it('should get the entry state of an event', async () => {
    expect(await service.entryState(1, 1)).toBe(true);
    expect(await service.entryState(2, 1)).toBe(false);
  });
});
