import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserEntity, Role } from 'src/common/entity/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto, UpdateUserDto } from 'src/common/dto/user.dto';
import { ImageService } from 'src/image/image.service';

describe('UserService', () => {
  let userEntity: UserEntity;
  
  let service: UserService;
  const repositoryMock = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    findOneOrFail: jest.fn(),
    delete: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: ImageService, useValue: { saveAvatar: jest.fn() }},
        {
          provide: getRepositoryToken(UserEntity),
          useValue: repositoryMock
        }
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  beforeEach(() => {
    userEntity = new UserEntity();
    userEntity.id = 0;
    userEntity.createdAt = new Date(2020, 1, 1);
    userEntity.enabled = true;
    userEntity.email = 'test@test.com';
    userEntity.username = 'test';
    userEntity.password = 'test';
    userEntity.firstname = 'test';
    userEntity.lastname = 'test';
    userEntity.birthdate = new Date(2020, 1, 1);
    userEntity.biography = 'test';
    userEntity.location = 'test';
    userEntity.pictureId = 'temp';
    userEntity.role = Role.USER;
    userEntity.plants = [];
    userEntity.cuttings = [];
    userEntity.events = [];
    userEntity.joinedEvents = [];
    userEntity.favoritesCuttings = [];
    userEntity.messages = [];
    userEntity.participants = [];
    userEntity.plantCollection = [];
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
