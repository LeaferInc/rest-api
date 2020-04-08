/**
 * @author ddaninthe
 */

import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { Event } from './event.entity';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('Event Controller', () => {
  let controller: EventController;

  const events = [new Event(), new Event(), new Event()];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventController],
      providers: [
        {
          provide: EventService,
          useFactory: () => ({
            findAll: jest.fn(() => events),
            findOne: jest.fn((id: number) => events[id - 1]),
          })
        },
      ],
    }).compile();

    controller = module.get<EventController>(EventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of events', async () => {
    expect(await controller.getAll()).toBe(events);
  });
});

describe('Event Controller end-to-end', () => {
  let events: Event[] = [new Event(), new Event(), new Event()];

  let app: INestApplication;
  const mockEventService = {
    findAll: () => events,
    findOne: (id: number) => events[id - 1],
    createOne: (event: Event) => events.push(event),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        EventService,
        {
          provide: 'EventRepository',
          useValue: {}
        }
      ]
    })
      .overrideProvider(EventService)
      .useValue(mockEventService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeEach(() => {
    events = [new Event(), new Event(), new Event()];
  });

  /*it('/events (GET)', () => {
    return request(app.getHttpServer())
      .get('/events')
      .expect(200)
      .expect(events);
  });*/

  afterAll(async () => {
    await app.close();
  });
})