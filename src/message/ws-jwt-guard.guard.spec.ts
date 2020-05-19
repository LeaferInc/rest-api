import { WsJwtGuard } from './ws-jwt-guard.guard';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('WsJwtGuard', () => {
  let wsJwtGuard: WsJwtGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WsJwtGuard,
        { provide: JwtService, useValue: {} },
        { provide: UserService, useValue: {} }
      ],
    })
    .compile();

    wsJwtGuard = module.get<WsJwtGuard>(WsJwtGuard);
  });

  it('should be defined', () => {
    expect(wsJwtGuard).toBeDefined();
  });
});
