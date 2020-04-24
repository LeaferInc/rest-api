import { Module } from '@nestjs/common';
import { PlantService } from './plant.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlantEntity } from 'src/common/entity/plant.entity';
import { PlantController } from './plant.controller';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/common/entity/user.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([PlantEntity, UserEntity]), UserModule],
  controllers: [PlantController],
  providers: [PlantService, UserService],
  exports: [PlantService]
})
export class PlantModule { }
