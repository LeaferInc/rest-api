/**
 * @author ddaninthe
 */

import { Controller, Get, Post, Body, Param, NotFoundException, BadRequestException } from '@nestjs/common';
import { EventService } from './event.service';
import { EventEntity } from '../common/entity/event.entity';
import { EventDto } from 'src/common/dto/event.dto';

@Controller('events')
export class EventController {
    constructor(private eventService: EventService) { }

    /**
     * Gets all Events
     * @returns an array of events
     * @throws NotFoundException if none was present
     */
    @Get()
    async getAll(): Promise<EventEntity[]> {
        const events: EventEntity[] = await this.eventService.findAll();
        if (events.length === 0) {
            throw new NotFoundException();
        }
        return events;
    }

    /**
     * Returns a list of incoming events ordered by start date
     */
    @Get('incoming')
    getIncoming(): Promise<EventEntity[]> {
        return this.eventService.findIncomings();
    }

    /**
     * Returns the list of all joined events of a user
     */
    @Get('joined')
    getJoined(): Promise<EventEntity[]> {
        // TODO: remove
        const userId = 1;

        return this.eventService.findJoined(userId);
    }
    

    /**
     * Returns a single Event by its identifier or a 404 Status Code if none was found
     * @param id the identifier of the Event
     */
    @Get("/:id")
    getById(@Param() id: number): Promise<EventEntity> {
        // TODO: remove
        const userId = 1;

        return this.eventService.findOneForUser(id, userId);
    }

    /**
     * Creates an Event
     * @param eventDto the Event to create
     */
    @Post()
    async createEvent(@Body() eventDto: EventDto): Promise<EventEntity> {
        // TODO: remove
        const userId = 1;
        eventDto.organizer = userId;

        if (eventDto.startDate > eventDto.endDate) {
            throw new BadRequestException("`startDate` is greater than `endDate`.");
        }
        return await this.eventService.createOne(eventDto);
    }
}
