/**
 * @author ddaninthe
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';

@Injectable()
export class EventService {
    constructor(@InjectRepository(Event) private readonly eventsRepository: Repository<Event>) { }

    async findAll(): Promise<Event[]> {
        return this.eventsRepository.find();
    }

    async findOne(id: number): Promise<Event> {
        return this.eventsRepository.findOne(id);
    }

    createOne(event: Event): Promise<Event> {
        return this.eventsRepository.save(event);
    }
}
