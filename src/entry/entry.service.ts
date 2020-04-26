/**
 * @author ddaninthe
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from 'src/common/entity/event.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/common/entity/user.entity';

@Injectable()
export class EntryService {

    constructor(@InjectRepository(EventEntity) private readonly eventRepository: Repository<EventEntity>,
        private userService: UserService) { }

    /**
     * Join a user to an Event
     * @param eventId the Event to join
     * @param userId the User who wants to join
     */
    async joinEvent(eventId: number, userId: number): Promise<EventEntity> {
        const user: UserEntity = await this.userService.findOne(userId);
        const event: EventEntity = await this.eventRepository.findOne(eventId);
        event.entrants.push(user);
        return await this.eventRepository.save(event);
    }
}
