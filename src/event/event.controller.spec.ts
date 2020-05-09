/**
 * @author ddaninthe
 */

import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { EventEntity } from '../common/entity/event.entity';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { EventServiceMock } from 'src/mocks/services/event.service.mock';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('Event Controller', () => {
  let controller: EventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventController],
      providers: [
        {
          provide: EventService,
          useValue: EventServiceMock.mock
        },
      ],
    }).compile();

    controller = module.get<EventController>(EventController);
  });

  beforeEach(() => {
    EventServiceMock.setup();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of events', async () => {
    expect(await controller.getAll()).toBe(EventServiceMock.testEvents);
  });
});

describe('Event Controller end-to-end', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        EventService,
        {
          provide: getRepositoryToken(EventEntity),
          useValue: {}
        }
      ]
    })
      .overrideProvider(EventService)
      .useValue(EventServiceMock.mock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeEach(() => {
    EventServiceMock.setup();
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