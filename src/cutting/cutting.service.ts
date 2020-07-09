import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { CuttingEntity } from 'src/common/entity/cutting.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { CreateCuttingDto, UpdateCuttingDto } from 'src/common/dto/cutting.dto';
import { UserEntity } from 'src/common/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { Pagination, ResultData } from 'src/common/dto/query.dto';

@Injectable()
export class CuttingService {

  constructor(
    @InjectRepository(CuttingEntity) private readonly cuttingRepository: Repository<CuttingEntity>,
    private userService: UserService
  ) {}

  async create(createCuttingDto: CreateCuttingDto, userId: number): Promise<CuttingEntity> {
    const cutting: CuttingEntity = createCuttingDto.toEntity();

    const user: UserEntity = await this.userService.findOneById(userId);

    if(!user.premium) {
      const userCuttings = await this.findAllByUser(userId);
      if(userCuttings.count >= 6) {
        throw new UnauthorizedException('User is not premium and has a cutting collection with more than 6 cuttings');
      }
    }

    cutting.owner = user;

    return this.cuttingRepository.save(cutting);
  }

  async findOne(id: string | number): Promise<any> {
    let cutting: CuttingEntity; 
    
    try {
      cutting = await this.cuttingRepository.findOneOrFail(id);
    } catch {
      throw new HttpException('No cutting found', HttpStatus.NOT_FOUND);
    }

    return cutting;
  }

  async findAllByUser(userId: number, pagination?: Pagination): Promise<ResultData<CuttingEntity>> {
    const [items, count] = await this.cuttingRepository.findAndCount({ 
      where: { owner: { id: userId } },
      skip: pagination?.skip,
      take: pagination?.take
    });
    return {items, count};
  }

  async findAllExceptOwner(userId: number, pagination?: Pagination): Promise<ResultData<CuttingEntity>> {
    const [items, count] = await this.cuttingRepository.findAndCount({
      where: { owner: { id: Not(userId) } },
      skip: pagination?.skip,
      take: pagination?.take
    });
    return {items, count};
  }

  async findAll(pagination?: Pagination): Promise<ResultData<CuttingEntity>> {
    const [items, count] = await this.cuttingRepository.findAndCount({
      relations: ['owner'],
      skip: pagination?.skip,
      take: pagination?.take,
      order: { createdAt: 'DESC' }
    });
    return {items, count};
  }

  async edit(updateCuttingDto: UpdateCuttingDto) {
    // TODO: edit only if the cutting belongs to the user
    const { id, ...updateCutting } = updateCuttingDto;
    await this.cuttingRepository.update(id, updateCutting);
    return this.cuttingRepository.findOne(id);
  }

  async delete(id: string | number) {
    // TODO: delete only if the cutting belongs to the user
    return this.cuttingRepository.delete(id);
  }

  cuttingCount() {
    return this.cuttingRepository.count();
  }

}
