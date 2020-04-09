/**
 * @author ddaninthe
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEntity } from '../common/entity/event.entity';

@Injectable()
export class EventService {
    constructor(@InjectRepository(EventEntity) private readonly eventsRepository: Repository<EventEntity>) { }

    async findAll(): Promise<EventEntity[]> {
        return this.eventsRepository.find();
    }

    async findOne(id: number): Promise<EventEntity> {
        return this.eventsRepository.findOne(id);
    }

    createOne(event: EventEntity): Promise<EventEntity> {
        return this.eventsRepository.save(event);
    }
}
