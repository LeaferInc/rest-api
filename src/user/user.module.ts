import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/common/entity/user.entity';
import { PlantEntity } from 'src/common/entity/plant.entity';
import { EventEntity } from 'src/common/entity/event.entity';
import { ImageService } from 'src/image/image.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, PlantEntity, EventEntity])],
  controllers: [UserController],
  providers: [UserService, ImageService],
  exports: [UserService]
})
export class UserModule { }
