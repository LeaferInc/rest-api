import { Module } from '@nestjs/common';
import { PlantCollectionController } from './plant-collection.controller';
import { PlantCollectionService } from './plant-collection.service';
import { UserService } from 'src/user/user.service';
import { PlantService } from 'src/plant/plant.service';
import { PlantCollectionEntity } from 'src/common/entity/plant-collection.entity';
import { PlantEntity } from 'src/common/entity/plant.entity';
import { UserEntity } from 'src/common/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageService } from 'src/image/image.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlantCollectionEntity, PlantEntity, UserEntity]),
  ],
  controllers: [PlantCollectionController],
  providers: [PlantCollectionService, UserService, PlantService, ImageService],
  exports: [PlantCollectionService],
})
export class PlantCollectionModule {}
