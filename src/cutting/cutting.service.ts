import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { CuttingEntity } from 'src/common/entity/cutting.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, DeleteResult } from 'typeorm';
import { CreateCuttingDto, UpdateCuttingDto, CuttingDto } from 'src/common/dto/cutting.dto';
import { UserEntity } from 'src/common/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { Pagination, ResultData } from 'src/common/dto/query.dto';

@Injectable()
export class CuttingService {

  constructor(
    @InjectRepository(CuttingEntity) private readonly cuttingRepository: Repository<CuttingEntity>,
    private userService: UserService
  ) {}

  async create(createCuttingDto: CreateCuttingDto, userId: number): Promise<CuttingDto> {
    const cutting: CuttingEntity = createCuttingDto.toEntity();

    const user: UserEntity = await this.userService.findOneById(userId);

    if(!user.premium) {
      const userCuttings = await this.findAllByUser(userId);
      if(userCuttings.count >= 6) {
        throw new UnauthorizedException('User is not premium and has a cutting collection with more than 6 cuttings');
      }
    }

    cutting.owner = user;

    return (await this.cuttingRepository.save(cutting)).toDto();
  }

  async findOne(id: string | number): Promise<CuttingDto> {
    let cutting: CuttingEntity; 
    
    try {
      cutting = await this.cuttingRepository.findOneOrFail(id);
    } catch {
      throw new HttpException('No cutting found', HttpStatus.NOT_FOUND);
    }

    return cutting?.toDto();
  }

  async findAllByUser(userId: number, pagination?: Pagination): Promise<ResultData<CuttingDto>> {
    const [items, count] = await this.cuttingRepository.findAndCount({ 
      where: { owner: { id: userId } },
      skip: pagination?.skip,
      take: pagination?.take
    });
    return {items: items.map((c: CuttingEntity) => c.toDto()), count};
  }

  async findAllExceptOwner(userId: number, pagination?: Pagination): Promise<ResultData<CuttingDto>> {
    const [items, count] = await this.cuttingRepository.findAndCount({
      where: { owner: { id: Not(userId) } },
      skip: pagination?.skip,
      take: pagination?.take
    });
    return {items: items.map((c: CuttingEntity) => c.toDto()), count};
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
  
  async edit(updateCuttingDto: UpdateCuttingDto): Promise<CuttingDto> {
    // TODO: edit only if the cutting belongs to the user
    const { id, ...updateCutting } = updateCuttingDto;
    await this.cuttingRepository.update(id, updateCutting);
    return (await this.cuttingRepository.findOne(id)).toDto();
  }

  async delete(id: string | number): Promise<DeleteResult> {
    // TODO: delete only if the cutting belongs to the user
    return this.cuttingRepository.delete(id);
  }

  cuttingCount() {
    return this.cuttingRepository.count();
  }
}
