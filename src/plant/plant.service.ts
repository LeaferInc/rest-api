import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlantEntity } from 'src/common/entity/plant.entity';
import { Repository, FindManyOptions, DeleteResult } from 'typeorm';
import { CreatePlantDto } from 'src/common/dto/plant.dto';
import { UserEntity } from 'src/common/entity/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PlantService {
  constructor(
    @InjectRepository(PlantEntity)
    private plantRepository: Repository<PlantEntity>,
    private userService: UserService
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
   * Return many plant based on the options
   * @param options 
   */
  findAll(options?: FindManyOptions<PlantEntity>): Promise<PlantEntity[]> {
    return this.plantRepository.find(options);
  }

  /**
   * Find the first occurence of a plant
   * @param criteria is the plantId or the name
   */
  findOne(criteria: string): Promise<PlantEntity> {
    return this.plantRepository.findOne(JSON.parse(criteria));
  }

  /**
   * Find all occurences of plants with this criteria
   * @param criteria is the criteria of the search
   */
  findByCriteria(criteria: string): Promise<PlantEntity[]> {
    return this.plantRepository.find(JSON.parse(criteria));
  }

  async findAllByByUser(user: Express.User): Promise<[Array<PlantEntity>, number]> {
    const items = await this.plantRepository.findAndCount({
      where: { owner: { id: user.userId } }
    });
    return items;
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
