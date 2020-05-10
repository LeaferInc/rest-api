import { Test, TestingModule } from '@nestjs/testing';
import { CuttingService } from './cutting.service';
import { CuttingEntity } from 'src/common/entity/cutting.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { CreateCuttingDto } from 'src/common/dto/cutting.dto';
import { UserEntity } from 'src/common/entity/user.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { of } from 'rxjs';

describe('CuttingService', () => {
  let service: CuttingService;
  
  let cuttingEntity: CuttingEntity;
  const repositoryMock = {
    save: jest.fn(),
    find: jest.fn(),
    findOneOrFail: jest.fn(),
    findAndCount: jest.fn(() => of([[cuttingEntity, cuttingEntity], 2])),
  };
  const userServiceMock = {
    findOne: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CuttingService,
        {
          provide: getRepositoryToken(CuttingEntity),
          useValue: repositoryMock
        },
        {
          provide: UserService,
          useValue: userServiceMock
        }
      ],
    }).compile();

    service = module.get<CuttingService>(CuttingService);
  });

  beforeEach(() => {
    cuttingEntity = {
      id: 0,
      createdAt: new Date(2020, 1, 1),
      enabled: true,
      name: 'name',
      description: 'description',
      tradeWith: '',
      viewsCount: 0,
      owner: null,
      ownerId: 1
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  /*it('should create a cutting', async () => {
    const createCuttingDto = new CreateCuttingDto();
    createCuttingDto.name = 'name';
    createCuttingDto.description = 'description';

    const ownerdId = 1;

    const userEntity = new UserEntity();

    repositoryMock.save.mockReturnValue(cuttingEntity);
    userServiceMock.findOne.mockReturnValue(userEntity);

    const cuttingNewlyCreated = await service.create(createCuttingDto, ownerdId);

    expect(repositoryMock.save).toHaveReturnedWith(cuttingEntity);
    expect(cuttingNewlyCreated).toEqual(cuttingEntity);
    expect(cuttingNewlyCreated.name).toBe(createCuttingDto.name);
    expect(cuttingNewlyCreated.description).toBe(createCuttingDto.description);
  });

  it('should findOne return the first cutting', async () => {
    repositoryMock.findOneOrFail.mockReturnValue(cuttingEntity);

    const cutting = await service.findOne(0);

    expect(cutting).toEqual(cuttingEntity);
  });

  it('should findOne throw exception', async () => {
    repositoryMock.findOneOrFail.mockRejectedValue(
      new HttpException('No cutting found', HttpStatus.NO_CONTENT)
    );

    expect(service.findOne(1)).rejects.toThrowError(HttpException);
  });

  // TODO: Not well tested ; should make an implementation of find
  it('should return all cuttings own by the user', async () => {
    const user: Express.User = {
      userId: 1,
      username: 'username'
    };

    const cuttings = [cuttingEntity, cuttingEntity];

    repositoryMock.find.mockReturnValue(cuttings);

    const resCuttings = await service.findAllByUser(user);

    expect(cuttings).toEqual(resCuttings);
  });

  // TODO: Not well tested ; should make an implementation of find
  it('should return all cuttings not own by the user', async () => {
    const user: Express.User = {
      userId: 1,
      username: 'username'
    };

    const cuttings = [cuttingEntity, cuttingEntity];

    repositoryMock.find.mockReturnValue(cuttings);

    const resCuttings = await service.findAllExceptOwner(user);

    expect(cuttings).toEqual(resCuttings);
  });*/
});
