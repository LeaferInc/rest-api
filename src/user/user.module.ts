import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/common/entity/user.entity';
import { PlantEntity } from 'src/common/entity/plant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, PlantEntity])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
