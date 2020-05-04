import { Module } from '@nestjs/common';
import { CuttingController } from './cutting.controller';
import { CuttingService } from './cutting.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CuttingEntity } from 'src/common/entity/cutting';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/common/entity/user.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([CuttingEntity, UserEntity]), UserModule],
  controllers: [CuttingController],
  providers: [CuttingService],
  exports: [CuttingService],
})
export class CuttingModule {}
