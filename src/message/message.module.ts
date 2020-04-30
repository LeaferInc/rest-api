import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MessageEntity } from 'src/common/entity/message';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/common/entity/user.entity';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity, UserEntity])],
  providers: [MessageService, UserService],
  controllers: [MessageController],
  exports: [MessageService]
})
export class MessageModule {}
