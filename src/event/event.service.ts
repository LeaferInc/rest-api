/**
 * @author ddaninthe
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, MoreThan, Raw } from 'typeorm';
import { EventEntity } from '../common/entity/event.entity';
import { CreateEventDto } from '../common/dto/event.dto';
import { UserEntity } from 'src/common/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { GeoPosition } from 'geo-position.ts';
import { ImageService } from 'src/image/image.service';

@Injectable()
export class EventService {
    private static readonly LIMIT = 30;
    private static readonly MAX_METER_DISTANCE = 1000;

    constructor(@InjectRepository(EventEntity) private readonly eventRepository: Repository<EventEntity>,
        private userService: UserService,
        private imageService: ImageService) { }

    /**
     * Return all the Events
     */
    findAll(): Promise<EventEntity[]> {
        return this.eventRepository.find();
    }

    /**
     * Find all events after a given date
     * @param date the date after the event has to begin
     */
    findAfterDate(date: Date): Promise<EventEntity[]> {
        return this.eventRepository.find({
            where: {
                startDate: MoreThan(date),
            },
            order: {
                startDate: 'ASC',
            },
            take: EventService.LIMIT,
        });
    }

    /**
     * Finds events matching the keyword in either their name or description.
     * Case insensitive.
     * @param keywords the words to search
     */
    findByKeywords(keywords: string): Promise<EventEntity[]> {
        return this.eventRepository.find({
            where: [
                { name: Raw(alias => `${alias} ILIKE '%${keywords}%'`) },
                { description: Raw(alias => `${alias} ILIKE '%${keywords}%'`) },
            ],
            order: {
                startDate: 'ASC',
            },
            take: EventService.LIMIT,
        });
    }

    /**
     * Find closest events to the given coordinates
     * @param latitude latitude coordinate to compare
     * @param longitude longitude coordinate to compare
     */
    async findClosest(latitude: number, longitude: number): Promise<EventEntity[]> {
        const from = new GeoPosition(latitude, longitude);
        const events: EventEntity[] = await this.findAll();

        return events.filter((event => {
            const eventPosition = new GeoPosition(event.latitude, event.longitude);
            const distance = +from.Distance(eventPosition).toFixed(0);
            return distance < EventService.MAX_METER_DISTANCE;
        }));
    }

    /**
     * Returns the list of all joined events of a user
     * @param userId the related user's id
     */
    async findJoined(userId: number): Promise<EventEntity[]> {
        const user: UserEntity = await this.userService.findOneById(userId, { relations: ['joinedEvents'] });

        if (!user) {
            throw new NotFoundException();
        }
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
     * Create an Event in the database
     * @param eventDto the Event to create
     */
    async createOne(eventDto: CreateEventDto, organizer: number): Promise<EventEntity> {
        // toEntity() saves the file
        const event: EventEntity = eventDto.toEntity();

        const user: UserEntity = await this.userService.findOneById(organizer);
        event.organizer = user;

        return this.eventRepository.save(event);
    }
}
