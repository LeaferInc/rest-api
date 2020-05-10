import { Test, TestingModule } from '@nestjs/testing';
import { ParticipantService } from './participant.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ParticipantEntity } from 'src/common/entity/participant.entity';
import { UserService } from 'src/user/user.service';
import { RoomService } from 'src/room/room.service';
import { UserServiceMock } from 'src/mocks/services/user.service.mock';

describe('ParticipantService', () => {
  let service: ParticipantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ParticipantService,
          useValue: {}
        },
        {
          provide: getRepositoryToken(ParticipantEntity),
          useValue: {}
        },
        {
          provide: UserService,
          useValue: UserServiceMock.mock
        },
        {
          provide: RoomService,
          useValue: {}
        },
      ],
    }).compile();

    service = module.get<ParticipantService>(ParticipantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
