import { Test, TestingModule } from '@nestjs/testing';
import { MessageService } from './message.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MessageEntity } from 'src/common/entity/message.entity';
import { UserService } from 'src/user/user.service';
import { UserServiceMock } from 'src/mocks/services/user.service.mock';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: MessageService,
          useValue: {}
        },
        {
          provide: getRepositoryToken(MessageEntity),
          useValue: {}
        },
        {
          provide: UserService,
          useValue: UserServiceMock.mock,
        }
      ],
    }).compile();

    service = module.get<MessageService>(MessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
