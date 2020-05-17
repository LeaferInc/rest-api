import { Injectable } from '@nestjs/common';
import { ParticipantEntity } from 'src/common/entity/participant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository} from 'typeorm';

@Injectable()
export class ParticipantService {

  constructor(
    @InjectRepository(ParticipantEntity) private readonly participantRepository: Repository<ParticipantEntity>,
  ) {}

  // findOneByUserId(userId: number): Promise<ParticipantEntity> {
  //   return this.participantRepository.findOne({
  //     relations: ['user'],
  //     where: {user: {id: userId}}
  //   });
  // }

  // findOneByRoomId(roomId: number): Promise<ParticipantEntity> {
  //   return this.participantRepository.findOne({
  //     relations: ['room'],
  //     where: {room: {id: roomId}}
  //   });
  // }

  // findByUserId(userId: number): Promise<ParticipantEntity[]> {
  //   return this.participantRepository.find({
  //     relations: ['user', 'room'],
  //     where: {user: {id: userId}}
  //   });
  // }

  findByRoomId(roomId: number): Promise<ParticipantEntity[]> {
    return this.participantRepository.find({
      relations: ['user', 'room'],
      where: { room: { id: roomId } }
    });
  }

  findByRoomIdAndUserId(roomId: number, userId: number): Promise<ParticipantEntity> {
    return this.participantRepository.findOneOrFail({
      relations: ['user', 'room'],
      where: {
        room: { id: roomId }, user: { id: userId },
      }
    });
  }

  async findIfUsersAreAlreadyInRoom(senderId: Number, receiverId: Number): Promise<any> {
    return getRepository(ParticipantEntity)
      .createQueryBuilder('p1')
      .select('p1.room_id')
      .where('p1.user_id IN (:...ids)', {ids: [senderId, receiverId]})
      .andWhere(qb => {
        const subQuery = qb.subQuery()
          .select('p2.room_id')
          .from(ParticipantEntity, 'p2')
          .where('p2.user_id NOT IN (:...ids)', {ids: [senderId, receiverId]})
          .getQuery();
        return 'p1.room_id NOT IN ' + subQuery;
      })
      .groupBy('p1.room_id')
      .having('COUNT(DISTINCT p1.user_id) = :nbr_users', { nbr_users: 2 })
      .getRawOne();
  }
}
