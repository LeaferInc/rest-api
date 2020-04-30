import { Injectable } from '@nestjs/common';
import { MessageEntity } from 'src/common/entity/message';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { CreateMessageDto } from 'src/common/dto/message';
import { UserEntity } from 'src/common/entity/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity) private readonly messageRepository: Repository<MessageEntity>,
    private userService: UserService
  ) {}

  async create(createMessageDto: CreateMessageDto, userId: number): Promise<MessageEntity> {
    let message: MessageEntity = new MessageEntity();

    // TODO: Promise all this
    const sender: UserEntity = await this.userService.findOne(userId);
    const receiver: UserEntity = await this.userService.findOne(createMessageDto.receiverId);

    message.message_content = createMessageDto.message_content;
    message.sender = sender;
    message.receiver = receiver;

    return this.messageRepository.save(message);
  }

  findConversation(senderId: number, receiverId: number): Promise<MessageEntity[]> {
    return this.messageRepository.find({
      relations: ['sender', 'receiver'],
      // select: ['id', 'sender'],
      where: [
        { sender: { id: senderId }, receiver: { id: receiverId } },
        { sender: { id: receiverId}, receiver: { id: senderId} }
      ]
    });
  }
}
