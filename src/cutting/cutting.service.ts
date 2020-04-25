import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CuttingEntity } from 'src/common/entity/cutting';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCuttingDto } from 'src/common/dto/cutting';
import { UserEntity } from 'src/common/entity/user.entity';
import { UserService } from 'src/user/user.service';

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

  findAllByUser(user: Express.User): Promise<Array<CuttingEntity>> {
    return this.cuttingRepository.find(
      {
        where: {
          owner: { id: user.userId }
        }
      }
    );
  }

  findAll(): Promise<any> {
    return this.cuttingRepository.find();
  }

}
