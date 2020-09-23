import { Module } from '@nestjs/common';
import { BestPlantService } from './best-plant.service';
import { BestPlantController } from './best-plant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BestPlantEntity } from 'src/common/entity/best-plant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BestPlantEntity])],
  controllers: [BestPlantController],
  providers: [BestPlantService],
  exports: [BestPlantService]
})
export class BestPlantModule {}
