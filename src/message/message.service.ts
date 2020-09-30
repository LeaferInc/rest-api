import { Injectable, UnauthorizedException, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { MessageEntity } from 'src/common/entity/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { CreateMessageDto, CreateDiscussionMessageDto } from 'src/common/dto/message.dto';
import { UserService } from 'src/user/user.service';
import { RoomService } from 'src/room/room.service';
import { RoomEntity } from 'src/common/entity/room.entity';
import { ParticipantService } from 'src/participant/participant.service';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { MessageGateway } from 'src/message/message.gateway';
import { ParticipantEntity } from 'src/common/entity/participant.entity';
import { v4 as uuid } from 'uuid';
import { NotificationService } from 'src/notification/notification.service';
import { TypeNotification } from 'src/common/entity/notification.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity) private readonly messageRepository: Repository<MessageEntity>,
    @InjectRepository(ParticipantEntity) private readonly participantRepository: Repository<ParticipantEntity>,
    @InjectRepository(RoomEntity) private readonly roomRepository: Repository<RoomEntity>,
    private userService: UserService,
    private roomService: RoomService,
    private participantService: ParticipantService,
    private messageGateway: MessageGateway,
    private notificationService: NotificationService,
  ) {}

  async create(createMessageDto: CreateMessageDto, userId: number): Promise<MessageEntity> {
    try {
      await this.participantService.findByRoomIdAndUserId(createMessageDto.roomId, userId);
    } catch(err) {
      if(err instanceof EntityNotFoundError) {
        throw new UnauthorizedException();
      } else {
        throw err;
      }
    }

    // Create message entity
    const message: MessageEntity =
      await this.createMessage(createMessageDto.messageContent, createMessageDto.roomId, userId);
    // Send message to socket
    this.messageGateway.addMessageExternal(message);

    return this.messageRepository.save(message);
  }


  async createDiscussion(createDiscussionMessageDto: CreateDiscussionMessageDto, userId: number): Promise<MessageEntity> {
    let room: RoomEntity;
    const roomId = await this.participantService.findIfUsersAreAlreadyInRoom(userId, createDiscussionMessageDto.receiverId);

    if(roomId == null) {
      await getManager().transaction(async transactionalEntityManager  => {
        room = await transactionalEntityManager.save(await this.createRoom());
        await transactionalEntityManager.save(
          await this.createParticipant(room, userId)
        );
        await transactionalEntityManager.save(
          await this.createParticipant(room, createDiscussionMessageDto.receiverId)
        );
      });
    } else {
      try {
        room = await this.roomService.findOne(Number(roomId.room_id));
      } catch(err) {
        throw new BadRequestException();
      }
    }

    const message: MessageEntity = new MessageEntity();
    message.messageContent = createDiscussionMessageDto.messageContent;
    message.room = room;
    message.user = await this.userService.findOneById(userId);
    // Send message to socket
    // this.messageGateway.addMessageExternal(message);
    this.messageGateway.newDiscussion(
      message.user,
      await this.userService.findOneById(createDiscussionMessageDto.receiverId),
      room.id
    );

    // Notification
    this.notificationService.create({
      type: TypeNotification.NEW_CONVERSATION,
      title: 'Nouveau message',
      content: `${message.user.username} vous a contacté`,
      href: `/chat/${message.room.id}`,
      notifier_id: createDiscussionMessageDto.receiverId
    });

    return this.messageRepository.save(message);
  }

  async findConversation(userId: number, roomId: number): Promise<MessageEntity[]> {
    // Check if user is in the room ; throw error if not
    try {
      await this.participantService.findByRoomIdAndUserId(roomId, userId);
    } catch(err) {
      if(err instanceof EntityNotFoundError) {
        throw new UnauthorizedException();
      } else {
        throw err;
      }
    }

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

  private async createRoom(): Promise<RoomEntity> {
    const roomEntity = new RoomEntity();
    roomEntity.name = uuid();
    return roomEntity;
  }

  private async createParticipant(room: RoomEntity, userId: number): Promise<ParticipantEntity> {
    // Check if user is already in a specific room, if yes throw BadRequest, if no, an error occured
    // as EntityNotFoundError.
    try {
      await this.participantService.findByRoomIdAndUserId(room.id, userId);
    } catch(err) {
      if(err instanceof EntityNotFoundError) {
        const participant = new ParticipantEntity();
        participant.room = room;
        participant.user = await this.userService.findOneById(userId);
        return participant;
      } else {
        throw err;
      }
    }

    throw new HttpException(
      `User ${userId} is already a participant to the room ${room.id}`,
      HttpStatus.BAD_REQUEST
    );
  }

  private async createMessage(messageContent: string, roomId: number, userId: number): Promise<MessageEntity> {
    const message: MessageEntity = new MessageEntity();
    message.messageContent = messageContent;
    message.room = await this.roomService.findOne(roomId);
    message.user = await this.userService.findOneById(userId);
    return message;
  }
}
