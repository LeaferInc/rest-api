import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { PlantCollectionEntity } from 'src/common/entity/plant-collection.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { PlantService } from 'src/plant/plant.service';
import { ResultData } from 'src/common/dto/query.dto';

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

    if(!userEntity.premium) {
      const [userGarden, count] = await this.findByUserAndCount(userId);
      
      if(count >= 3) {
        throw new UnauthorizedException('User is not premium and has a garden with more than 3 plants');
      }
    }

    const plantCollectionEntity = new PlantCollectionEntity();
    plantCollectionEntity.plant = plantEntity;
    plantCollectionEntity.user = userEntity;
    this.plantCollectionRepository.save(plantCollectionEntity);
    return plantCollectionEntity;
  }

  async findByPlantAndUser(userId: number, plantId: number): Promise<PlantCollectionEntity | boolean> {
    try {
      return await this.plantCollectionRepository.findOneOrFail({
        relations: [ 'user', 'plant' ],
        where: {
          user: { id: userId },
          plant: { id: plantId }
        }
      });
    } catch(err) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async findByUserAndCount(userId: number): Promise<[PlantCollectionEntity[], number]> {
    return this.plantCollectionRepository.findAndCount({
      where: { user: { id: userId } }
    });
  }

  async deleteByPlantId(plantId: number) {
    //TODO: need security
    return this.plantCollectionRepository.delete({
      plant: { id: plantId },
    });
  }
}
