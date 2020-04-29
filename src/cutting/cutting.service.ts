import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CuttingEntity } from 'src/common/entity/cutting';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { CreateCuttingDto } from 'src/common/dto/cutting';
import { UserEntity } from 'src/common/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { Pagination, ResultData } from 'src/common/dto/query';

@Injectable()
export class CuttingService {

  constructor(
    @InjectRepository(CuttingEntity) private readonly cuttingRepository: Repository<CuttingEntity>,
    private userService: UserService
  ) {}

  async create(createCuttingDto: CreateCuttingDto, ownerId: number): Promise<CuttingEntity> {
    const cutting: CuttingEntity = createCuttingDto.toEntity();

    const user: UserEntity = await this.userService.findOne(ownerId);
    cutting.owner = user;

    return this.cuttingRepository.save(cutting);
  }

  async findOne(id: string | number): Promise<any> {
    let cutting: CuttingEntity; 
    
    try {
      cutting = await this.cuttingRepository.findOneOrFail(id);
    } catch {
      throw new HttpException('No cutting found', HttpStatus.NO_CONTENT);
    }

    return cutting;
  }

  async findAllByUser(user: Express.User, pagination?: Pagination): Promise<ResultData<CuttingEntity>> {
    const [items, count] = await this.cuttingRepository.findAndCount({ 
      where: { owner: { id: user.userId } },
      skip: pagination?.skip,
      take: pagination?.take
    });
    return {items, count};
  }

  async findAllExceptOwner(user: Express.User, pagination?: Pagination): Promise<ResultData<CuttingEntity>> {
    const [items, count] = await this.cuttingRepository.findAndCount({
      where: { owner: { id: Not(user.userId) } },
      skip: pagination?.skip,
      take: pagination?.take
    });
    return {items, count};
  }

}
