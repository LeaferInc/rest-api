/**
 * @author ddaninthe
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, MoreThan } from 'typeorm';
import { EventEntity } from '../common/entity/event.entity';
import { EventDto } from '../common/dto/event.dto';
import { UserEntity } from 'src/common/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { AppTime } from 'src/common/app.time';

@Injectable()
export class EventService {

    constructor(@InjectRepository(EventEntity) private readonly eventRepository: Repository<EventEntity>,
        private userService: UserService) { }

    /**
     * Return all the Events
     */
    findAll(): Promise<EventEntity[]> {
        return this.eventRepository.find();
    }

    /**
     * Find all incoming events and take only the few firsts
     */
    findIncomings(): Promise<EventEntity[]> {
        return this.eventRepository.find({
            where: {
                startDate: MoreThan(AppTime.now)
            },
            order: {
                startDate: 'ASC'
            },
            take: 12
        });
    }

    /**
     * Returns the list of all joined events of a user
     * @param userId the related user's id
     */
    async findJoined(userId: number): Promise<EventEntity[]> {
        const user: UserEntity = await this.userService.findOne(userId, { relations: ['joinedEvents']});

        // Indicate that events have been join
        user.joinedEvents.map((event) => {
            event.joined = true;
        });
        return user.joinedEvents;
    }

    /**
     * Find an Event by its id.
     * @param id the event's id
     * @param options additional options for querying database
     */
    findOne(id: number, options?: FindOneOptions): Promise<EventEntity> {
        return this.eventRepository.findOne(id, options);
    }

    /**
     * Find an Event by its id.
     * Sets a parameter indicating whether the user has joined or not the event
     * @param eventId the event's id
     * @param userId the user requesting the resource
     */
    async findOneForUser(eventId: number, userId: number): Promise<EventEntity> {
        const event: EventEntity = await this.findOne(eventId, { relations: ['entrants'] });
        if (!event) {
            throw new NotFoundException();
        }
        event.joined = event.entrants && event.entrants.find(user => user.id === userId) != null;
        return event;
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
