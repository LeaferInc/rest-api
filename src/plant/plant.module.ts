import { Module } from '@nestjs/common';
import { PlantService } from './plant.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlantEntity } from 'src/common/entity/plant.entity';
import { PlantController } from './plant.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PlantEntity])],
  controllers: [PlantController],
  providers: [PlantService],
  exports: [PlantService]
})
export class PlantModule { }
