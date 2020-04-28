/**
 * @author ddaninthe
 */

import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from 'src/common/entity/event.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/common/entity/user.entity';
import { EventService } from 'src/event/event.service';

@Injectable()
export class EntryService {

    constructor(@InjectRepository(EventEntity) private readonly eventRepository: Repository<EventEntity>,
        private eventService: EventService,
        private userService: UserService) { }

    /**
     * Join a user to an Event
     * @param eventId the Event to join
     * @param userId the User who wants to join
     */
    async joinEvent(eventId: number, userId: number): Promise<EventEntity> {
        const user: UserEntity = await this.userService.findOne(userId);
        const event: EventEntity = await this.eventService.findOne(eventId, { relations: ['organizer'] });

        if (!event) {
            throw new NotFoundException(`Can't find Event for id: ${eventId}`);
        }

        if (!event.entrants) event.entrants = [];

        if (event.entrants.length >= event.maxPeople) {
            throw new ForbiddenException(`The places limit of ${event.maxPeople} has been reached`);
        }

        event.entrants.push(user);

        return this.eventRepository.save(event);
    }

    /**
     * Removes a participant from an event
     * @param eventId The related event
     * @param userId The user to remove
     */
    async unjoinEvent(eventId: number, userId: number): Promise<EventEntity> {
        const event: EventEntity = await this.eventService.findOne(eventId, { relations: ['entrants'] });

        if (!event) {
            throw new NotFoundException(`Can't find Event for id: ${eventId}`);
        }

        if (event.entrants) {
            event.entrants = event.entrants.filter((entrant: UserEntity) => {
                entrant.id !== userId;
            });

            return this.eventRepository.save(event);
        }
    }
}
