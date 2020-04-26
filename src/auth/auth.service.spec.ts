import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/common/entity/user.entity';
import { UserDto } from 'src/common/dto/user.dto';

describe('AuthService', () => {
  let service: AuthService;
  const userServiceMock = {
    findOne: jest.fn()
  }
  const jwtServiceMock = {
    sign: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: userServiceMock },
        { provide: JwtService, useValue: jwtServiceMock }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  beforeEach(() => {
    userServiceMock.findOne.mockReset();
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return null', async () => {
    userServiceMock.findOne.mockReturnValue({});
    const username = 'test';
    const password = 'test';

    const data = await service.validateUser(username, password);

    expect(userServiceMock.findOne).toHaveBeenCalledTimes(1);
    expect(userServiceMock.findOne).toHaveReturnedWith({});
    expect(data).toBeNull();
  });

  it('should return the user found', async () => {
    const user: UserEntity = {
      id: 0,
      createdAt: new Date(2020, 1, 1),
      enabled: true,
      email: 'test@test.com',
      username: 'test',
      password: 'test',
      firstname: 'test',
      lastname: 'test',
      birthdate: new Date(2020, 1, 1),
      biography: 'test',
      location: 'test',
      pictureId: 0,
      plants: [],
      events: [],
      cuttings: []
    };

    userServiceMock.findOne.mockReturnValue(user);

    const username = 'test';
    const passwordParam = 'test';

    const data = await service.validateUser(username, passwordParam);
    const { password, ...result } = user;

    expect(userServiceMock.findOne).toHaveBeenCalledTimes(1);
    expect(userServiceMock.findOne).toHaveReturnedWith(user);
    expect(data).toEqual(result);
  });

  it('should return an access token', () => {
    jwtServiceMock.sign.mockReturnValue('test');

    const userDto: UserDto = new UserDto();
    userDto.id = 0;
    userDto.username = 'test';

    const accessToken = service.login(userDto);

    expect(jwtServiceMock.sign).toHaveBeenCalledTimes(1);
    expect(jwtServiceMock.sign).toHaveReturnedWith('test');
    expect(accessToken).toBe('test');
  });

});
