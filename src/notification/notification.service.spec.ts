import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from './notification.service';
import { NotificationEntity } from 'src/common/entity/notification.entity';
import { of } from 'rxjs';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { NotificationGateway } from './notification.gateway';

describe('NotificationService', () => {
  let service: NotificationService;
  const repositoryMock = {
    save: jest.fn(),
    findAndCount: jest.fn(() => of([[], 0])),
  };
  const userServiceMock = {
    findOneById: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        {
          provide: getRepositoryToken(NotificationEntity),
          useValue: repositoryMock
        },
        {
          provide: UserService,
          useValue: userServiceMock
        },
        {
          provide: NotificationGateway,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<NotificationService>(NotificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
