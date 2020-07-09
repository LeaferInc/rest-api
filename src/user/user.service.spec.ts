import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserEntity, Role } from 'src/common/entity/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto, UpdateUserDto } from 'src/common/dto/user.dto';

describe('UserService', () => {
  let userEntity: UserEntity;
  
  let service: UserService;
  const repositoryMock = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    findAndCount: jest.fn(),
    findOneOrFail: jest.fn(),
    delete: jest.fn()
  }

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
      role: Role.USER,
      plants: [],
      cuttings: [],
      events: [],
      joinedEvents: [],
      favoritesCuttings: [],
      messages: [],
      participants: [],
      plantCollection: [],
      premium: false,
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
    repositoryMock.findAndCount.mockReset();
    repositoryMock.findAndCount.mockReturnValue([[userEntity, userEntity, userEntity], 3]);

    const users = await service.findAll();

    expect(repositoryMock.findAndCount).toHaveBeenCalledTimes(1);
    expect(users.items).toHaveLength(3);
    expect(users.items).toContainEqual(userEntity);
  });

  it('should return one user', async () => {
    repositoryMock.findOneOrFail.mockReset();
    repositoryMock.findOneOrFail.mockReturnValue(userEntity);

    const user = await service.findOneById(userEntity.id);

    expect(repositoryMock.findOneOrFail).toHaveBeenCalledTimes(1);
    expect(user).toEqual(userEntity);
  });

  it('should update a user', async () => {
    repositoryMock.findOne.mockReset();
    repositoryMock.save.mockReset();
    repositoryMock.findOne.mockReturnValue(userEntity);

    const changes: UpdateUserDto = new UpdateUserDto();
    changes.biography = "New biography";
    changes.firstname = "John";

    const resUser = userEntity;
    resUser.biography = "New Biography";
    repositoryMock.save.mockReturnValue(resUser);

    const result = await service.update(userEntity.id, changes);

    expect(repositoryMock.findOne).toHaveBeenCalledTimes(1);

    expect(result).toBeTruthy();
    expect(result.biography).toBe("New biography");
    expect(result.firstname).toBe("John");

    expect(repositoryMock.save).toHaveBeenCalledTimes(1);
  });

  it('should remove the user and return a DeleteResult', async () => {
    repositoryMock.delete.mockReturnValue({});

    const res = await service.removeById(userEntity.id);

    expect(repositoryMock.delete).toHaveBeenCalledTimes(1);
    expect(res).toEqual({});
  });
});
