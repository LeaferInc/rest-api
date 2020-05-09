import { Injectable } from '@nestjs/common';
import { RoomEntity } from 'src/common/entity/room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Injectable()
export class RoomService {

  constructor(
    @InjectRepository(RoomEntity) private readonly roomRepository: Repository<RoomEntity>,
  ) {}

  create() {
    return this.roomRepository.save({ name: uuid() });
  }
  
  findOne(id: string | number) {
    return this.roomRepository.findOne(id);
  }

  /**
   * @param name is an uuid
   */
  findOneByName(name: string) {
    return this.roomRepository.findOne({ name: name })
  }

}
