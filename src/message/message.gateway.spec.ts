import { Test, TestingModule } from '@nestjs/testing';
import { MessageGateway } from 'src/message/message.gateway';
import { RoomService } from 'src/room/room.service';
import { JwtService } from '@nestjs/jwt';
import { WsJwtGuard } from './ws-jwt-guard.guard';

describe('MessageGateway', () => {
  let gateway: MessageGateway;
  const wsJwtGuard = {
    canActivate: jest.fn(() => true)
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageGateway,
        {
          provide: RoomService,
          useValue: {}
        },
        {
          provide: JwtService,
          useValue: {}
        }
      ],
    })
    .overrideGuard(WsJwtGuard).useValue(wsJwtGuard)
    .compile();

    gateway = module.get<MessageGateway>(MessageGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
