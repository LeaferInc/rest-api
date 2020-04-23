/**
 * @author ddaninthe
 */

import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from './event.service';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

describe('EventService', () => {
  let service: EventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventService, 
        {
          provide: UserService,
          useValue: {}
        },
        {
          provide: 'EventEntityRepository',
          useClass: Repository,
        }
      ],
    }).compile();

    service = module.get<EventService>(EventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
