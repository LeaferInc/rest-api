/**
 * @author ddaninthe
 */

import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from '../common/entity/event.entity';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { UserEntity } from 'src/common/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity, UserEntity]), UserModule],
  controllers: [EventController],
  providers: [EventService, UserService],
  exports: [EventService]
})
export class EventModule { }
