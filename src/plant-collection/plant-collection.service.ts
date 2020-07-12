import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PlantCollectionEntity } from 'src/common/entity/plant-collection.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { PlantService } from 'src/plant/plant.service';

@Injectable()
export class PlantCollectionService {
  constructor(
    @InjectRepository(PlantCollectionEntity)
    private plantCollectionRepository: Repository<PlantCollectionEntity>,
    private userService: UserService,
    private plantService: PlantService,
  ) { }

  async create(userId: number, plantId: number): Promise<PlantCollectionEntity> {
    const plantEntity = await this.plantService.findOne(String(plantId));
    const userEntity = await this.userService.findOneById(userId);
    const plantCollectionEntity = new PlantCollectionEntity();
    plantCollectionEntity.plant = plantEntity;
    plantCollectionEntity.user = userEntity;
    this.plantCollectionRepository.save(plantCollectionEntity);
    return plantCollectionEntity;
  }

  async findByPlantAndUser(userId: number, plantId: number): Promise<PlantCollectionEntity> {
    try {
      return await this.plantCollectionRepository.findOneOrFail({
        relations: ['user', 'plant'],
        where: {
          user: { id: userId },
          plant: { id: plantId }
        }
      });
    } catch (err) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async deleteByPlantId(plantId: number) {
    //TODO: need security
    return this.plantCollectionRepository.delete({
      id: plantId,
    });
  }
}
