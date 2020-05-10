import { Test, TestingModule } from '@nestjs/testing';
import { MessageGateway } from './message.gateway';
import { MessageService } from 'src/message/message.service';
import { RoomService } from 'src/room/room.service';

describe('MessageGateway', () => {
  let gateway: MessageGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessageGateway,
        {
          provide: MessageService, 
          useValue: {}
        },
        {
          provide: RoomService,
          useValue: {}
        }
      ],
    }).compile();

    gateway = module.get<MessageGateway>(MessageGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
