import { Test, TestingModule } from '@nestjs/testing';
import { EntryService } from './entry.service';
import { UserService } from 'src/user/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EventEntity } from 'src/common/entity/event.entity';

describe('EntryService', () => {
  let service: EntryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EntryService,
        {
          provide: UserService,
          useValue: {}
        },
        {
          provide: getRepositoryToken(EventEntity),
          useValue: {}
        }
      ],
    }).compile();

    service = module.get<EntryService>(EntryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
