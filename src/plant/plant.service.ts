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
  async create(plantDto: CreatePlantDto): Promise<PlantEntity> {
    const plant = this.plantRepository.create(plantDto);

    const user: UserEntity = await this.userService.findOne(plantDto.userId);
    plant.user = user;

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
  findOne(criteria: number | string): Promise<PlantEntity> {
    return typeof criteria == 'number' || Number(criteria)
      ? this.plantRepository.findOne(criteria)
      : this.plantRepository.findOne({ name: criteria });
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
