import { Injectable } from '@nestjs/common';
import { MessageEntity } from 'src/common/entity/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from 'src/common/dto/message.dto';
import { UserService } from 'src/user/user.service';
import { RoomService } from 'src/room/room.service';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity) private readonly messageRepository: Repository<MessageEntity>,
    private userService: UserService,
    private roomService: RoomService
  ) {}

  async create(createMessageDto: CreateMessageDto, userId: number): Promise<MessageEntity> {
    //TODO: check if user can create a message in the specific room
    const message: MessageEntity = new MessageEntity();
    message.messageContent = createMessageDto.messageContent;
    message.room = await this.roomService.findOne(createMessageDto.roomId);
    message.user = await this.userService.findOneById(userId);
    return this.messageRepository.save(message);
  }


  async createOffer(createMessageDto: CreateMessageDto, userId: number): Promise<MessageEntity> {
    return null;
  }

  findConversation(userId: number, roomId: number): Promise<MessageEntity[]> {
    return this.messageRepository.find({
      relations: ['user', 'room'],
      where: { 
        room: { id: roomId }
      },
      order: {
        createdAt: "ASC"
      }
    });
  }
}
