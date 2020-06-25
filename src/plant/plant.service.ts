import { Injectable, HttpException, HttpStatus, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlantEntity } from 'src/common/entity/plant.entity';
import { Repository, DeleteResult, Not, getRepository } from 'typeorm';
import { CreatePlantDto } from 'src/common/dto/plant.dto';
import { UserEntity } from 'src/common/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { Pagination, ResultData } from 'src/common/dto/query.dto';

@Injectable()
export class PlantService {
  constructor(
    @InjectRepository(PlantEntity)
    private plantRepository: Repository<PlantEntity>,
    private userService: UserService,
  ) { }

  /**
   * Create an plant in the database from the corresponding CreatePlantDto
   * @param plantDto 
   */
  async create(plantDto: CreatePlantDto, user: Express.User): Promise<PlantEntity> {
    const plant = this.plantRepository.create(plantDto);

    const userEntity: UserEntity = await this.userService.findOneById(user.userId);
    plant.owner = userEntity;

    return this.plantRepository.save(plant);
  }

  /**
   * Return many plant with pagination
   * @param options 
   */
  async findAllExceptOwner(owner: Express.User, pagination?: Pagination): Promise<ResultData<PlantEntity>> {
    const [items, count] = await this.plantRepository.findAndCount({
      where: { owner: { id: Not(owner.userId) } },
      skip: pagination?.skip,
      take: pagination?.take
    });
    return {items, count};
  }

  async findAllMyGarden(owner: Express.User, pagination?: Pagination): Promise<ResultData<PlantEntity>> {
    const [items, count] = await getRepository(PlantEntity)
      .createQueryBuilder('plant')
      .innerJoin('plant.users', 'plant_collection')
      .where('plant_collection.user_id = :userId', { userId: owner.userId })
      .take(pagination.take || 12)
      .skip(pagination.skip || 0)
      .getManyAndCount();
    
    return {items, count};
  }

  /**
   * Find the first occurence of a plant
   * @param criteria is the plantId or the name
   */
  async findOne(criteria: string): Promise<PlantEntity> {
    let plant: PlantEntity;

    try  {
      plant = await this.plantRepository.findOneOrFail(criteria);
    } catch(e) {
      throw new HttpException('No plant found', HttpStatus.NOT_FOUND);
    }

    return plant;
  }

  /**
   * Find all occurences of plants with this criteria
   * @param criteria is the criteria of the search
   */
  findByCriteria(criteria: string): Promise<PlantEntity[]> {
    return this.plantRepository.find(JSON.parse(criteria));
  }

  async findAllByByUser(user: Express.User, pagination?: Pagination): Promise<ResultData<PlantEntity>> {
    const [items, count] = await this.plantRepository.findAndCount({
      where: { owner: { id: user.userId } },
      skip: pagination?.skip,
      take: pagination?.take
    });
    return {items, count};
  }

  /**
   * Remove one or many plant
   * @param criteria is the plantId or the name
   */
  remove(criteria: number | string): Promise<DeleteResult> {
    return typeof criteria == 'number' || Number(criteria)
      ? this.plantRepository.delete(criteria)
      : this.plantRepository.delete({ name: criteria });
  }

}
