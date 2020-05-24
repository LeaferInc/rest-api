import { Test, TestingModule } from '@nestjs/testing';
import { MessageService } from './message.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MessageEntity } from 'src/common/entity/message.entity';
import { UserService } from 'src/user/user.service';
import { UserServiceMock } from 'src/mocks/services/user.service.mock';
import { ParticipantEntity } from 'src/common/entity/participant.entity';
import { RoomEntity } from 'src/common/entity/room.entity';
import { RoomService } from 'src/room/room.service';
import { ParticipantService } from 'src/participant/participant.service';
import { MessageGateway } from './message.gateway';
import { CreateMessageDto } from 'src/common/dto/message.dto';
import { UserEntity } from 'src/common/entity/user.entity';

describe('MessageService', () => {
  let messageService: MessageService;
  const messageRepositoryMock = {
    save: jest.fn()
  };
  const participantRepositoryMock = {

  };
  const roomRepositoryMock = {

  };
  const participantServiceMock = {
    findByRoomIdAndUserId: jest.fn()
  };
  const roomServiceMock = {
    findOne: jest.fn()
  };
  const messageGatewayMock = {
    addMessageExternal: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageService,
        {
          provide: getRepositoryToken(MessageEntity),
          useValue: messageRepositoryMock
        },
        {
          provide: getRepositoryToken(ParticipantEntity),
          useValue: participantRepositoryMock
        },
        {
          provide: getRepositoryToken(RoomEntity),
          useValue: roomRepositoryMock
        },
        {
          provide: UserService,
          useValue: UserServiceMock.mock,
        },
        {
          provide: RoomService,
          useValue: roomServiceMock,
        },
        {
          provide: ParticipantService,
          useValue: participantServiceMock,
        },
        {
          provide: MessageGateway,
          useValue: messageGatewayMock,
        },
      ],
    }).compile();

    messageService = module.get<MessageService>(MessageService);
  });

  it('should be defined', () => {
    expect(messageService).toBeDefined();
  });

  it('it should create a message', async () => {
    const roomEntity = new RoomEntity();
    roomEntity.id = 1
    roomEntity.name = 'name';

    const messageEntity = new MessageEntity();
    messageEntity.messageContent = 'un joli message';
    messageEntity.room = roomEntity;

    participantServiceMock.findByRoomIdAndUserId.mockReturnValue(null);
    roomServiceMock.findOne.mockReturnValue(roomEntity);
    messageGatewayMock.addMessageExternal.mockReturnValue(null);
    messageRepositoryMock.save.mockReturnValue(messageEntity)

    const createMessageDto: CreateMessageDto = new CreateMessageDto();
    createMessageDto.messageContent = 'un joli message';
    createMessageDto.roomId = 1;

    const createResult = await messageService.create(createMessageDto, 1);

    expect(createResult).toEqual(messageEntity);
    expect(createResult.room).toEqual(roomEntity);
  })
});
