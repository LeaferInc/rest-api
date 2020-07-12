import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UserService } from 'src/user/user.service';
import { PlantService } from 'src/plant/plant.service';
import { CuttingService } from 'src/cutting/cutting.service';
import { EventService } from 'src/event/event.service';
import { PlantEntity } from 'src/common/entity/plant.entity';
import { EventEntity } from 'src/common/entity/event.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/common/entity/user.entity';
import { CuttingEntity } from 'src/common/entity/cutting.entity';
import { ImageService } from 'src/image/image.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      CuttingEntity,
      PlantEntity,
      EventEntity,
    ]),
  ],
  controllers: [AdminController],
  providers: [
    AdminService,
    UserService,
    PlantService,
    CuttingService,
    EventService,
    ImageService,
  ],
})
export class AdminModule {}
