/**
 * @author ddaninthe
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Transaction } from 'typeorm';
import { EventEntity } from '../common/entity/event.entity';
import { EventDto } from '../common/dto/event.dto';
import { UserEntity } from 'src/common/entity/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class EventService {
    constructor(@InjectRepository(EventEntity) private readonly eventRepository: Repository<EventEntity>,
    private userService: UserService) { }

    /**
     * Return all the Event
     */
    findAll(): Promise<EventEntity[]> {
        return this.eventRepository.find();
    }

    /**
     * Find an Event by its id
     * @param criteria is the event's id
     */
    findOne(id: number): Promise<EventEntity> {
        return this.eventRepository.findOne(id);
    }

    /**
     * Create an Event in the databe
     * @param eventDto the Event to create
     */
    async createOne(eventDto: EventDto): Promise<EventEntity> {
        const event: EventEntity = eventDto.toEntity(); 

        const user: UserEntity = await this.userService.findOne(eventDto.organizer);
        event.organizer = user;

        return this.eventRepository.save(event);
    }
}
