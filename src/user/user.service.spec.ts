import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserEntity } from 'src/common/entity/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/common/dto/user.dto';

describe('UserService', () => {
  let service: UserService;
  const repositoryMock = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneOrFail: jest.fn(),
    delete: jest.fn()
  }
  let userEntity: UserEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: repositoryMock
        }
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  beforeEach(() => {
    userEntity = {
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
      cuttings: [],
      events: [],
      joinedEvents: [],
      favoritesCuttings: [],
      messages: [],
      participants: []
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an user and return the newly created user', async () => {

    const createUserDto = new CreateUserDto();
    createUserDto.username = 'test';
    createUserDto.password = 'test';
    createUserDto.firstname = 'test';
    createUserDto.lastname = 'test';

    repositoryMock.create.mockReturnValue({});
    repositoryMock.save.mockReturnValue(userEntity);
    repositoryMock.find.mockReturnValue([]);

    const userNewlyCreated = await service.create(createUserDto);

    expect(repositoryMock.create).toHaveBeenCalledTimes(1);
    expect(repositoryMock.save).toHaveBeenCalledTimes(1);
    expect(repositoryMock.create).toHaveReturnedWith({});
    expect(repositoryMock.save).toHaveReturnedWith(userEntity);
    expect(userNewlyCreated).toEqual(userEntity);
  });

  it('should return all users', async () => {
    repositoryMock.find.mockReset();
    repositoryMock.find.mockReturnValue([userEntity, userEntity, userEntity]);

    const users = await service.findAll();

    expect(repositoryMock.find).toHaveBeenCalledTimes(1);
    expect(users).toHaveLength(3);
    expect(users).toContainEqual(userEntity);
  });

  it('should return one user', async () => {
    repositoryMock.findOneOrFail.mockReset();
    repositoryMock.findOneOrFail.mockReturnValue(userEntity);

    const user = await service.findOneById(userEntity.id);

    expect(repositoryMock.findOneOrFail).toHaveBeenCalledTimes(1);
    expect(user).toEqual(userEntity);
  });

  it('should remove the user and return a DeleteResult', async () => {
    repositoryMock.delete.mockReturnValue({});

    const res = await service.removeById(userEntity.id);

    expect(repositoryMock.delete).toHaveBeenCalledTimes(1);
    expect(res).toEqual({});
  })

});
