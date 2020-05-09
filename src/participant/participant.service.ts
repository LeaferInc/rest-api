import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ParticipantEntity } from 'src/common/entity/participant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomService } from 'src/room/room.service';
import { UserService } from 'src/user/user.service';
import { CreateParticipantDto } from 'src/common/dto/participant.dto';

@Injectable()
export class ParticipantService {

  constructor(
    @InjectRepository(ParticipantEntity) private readonly participantRepository: Repository<ParticipantEntity>,
    private userService: UserService,
    private roomService: RoomService,
  ) {}

  async create(createParticipantDto: CreateParticipantDto, userId: number): Promise<ParticipantEntity> {
    if((await this.findByRoomIdAndUserId(createParticipantDto.roomId, userId)).length) {
      throw new HttpException(
        `User ${userId} is already a participant to the room ${createParticipantDto.roomId}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    console.log('eee', createParticipantDto.roomId);
    const participant = new ParticipantEntity();
    participant.room = await this.roomService.findOne(createParticipantDto.roomId);
    participant.user = await this.userService.findOne(userId);
    return this.participantRepository.save(participant);
  }

  async createWithRoom(...usersId: number[]) {
    if(usersId.length < 1) {
      throw new HttpException('UsersId doit etre plus grand que 1', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    // TODO: si une room avec les id utilisateurs existe deja, retourner cette room
    console.log(usersId);

    // const participants = await this.participantRepository.find({
    //   relations: ['user', 'room'],
    //   where: { 
    //     user: { id: In(usersId) }
    //   }
    // });
    // console.log('participants', participants);

    const room = await this.roomService.create();
    const participantsCreated = [];
    for (const userId of usersId) {
      const participant = await this.create({roomId: room.id}, userId);
      participantsCreated.push(participant);
    }
    return {participants: participantsCreated, room: room}; // return participant avec la room
  }

  findOneByUserId(userId: number): Promise<ParticipantEntity> {
    return this.participantRepository.findOne({
      relations: ['user'],
      where: {user: {id: userId}}
    });
  }

  findOneByRoomId(roomId: number): Promise<ParticipantEntity> {
    return this.participantRepository.findOne({
      relations: ['room'],
      where: {room: {id: roomId}}
    });
  }

  findByUserId(userId: number): Promise<ParticipantEntity[]> {
    return this.participantRepository.find({
      relations: ['user', 'room'],
      where: {user: {id: userId}}
    });
  }

  findByRoomId(roomId: number): Promise<ParticipantEntity[]> {
    return this.participantRepository.find({
      relations: ['user', 'room'],
      where: {room: {id: roomId}}
    });
  }

  findByRoomIdAndUserId(roomId: number, userId: number) {
    return this.participantRepository.find({
      relations: ['user', 'room'],
      where: {
        room: {id: roomId},
        user: {id: userId}
      }
    });
  }
}
