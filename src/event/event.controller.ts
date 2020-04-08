/**
 * @author ddaninthe
 */

import { Controller, Get, HttpCode, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from './event.entity';

@Controller('events')
export class EventController {
    constructor(private eventService: EventService) { }

    /**
     * Returns all {@link Event} or a 404 Status Code if none was present
     */
    @Get()
    async getAll(): Promise<Event[]> {
        const events: Event[] = await this.eventService.findAll();
        if (events.length === 0) {
            throw new NotFoundException();
        }
        return events;
    }

    /**
     * Returns a single {@link Event} by its identifier or a 404 Status Code if none was found
     * @param id the identifier of the {@link Event}
     */
    @Get("/:id")
    async getById(@Param() id: number): Promise<Event> {
        const event: Event = await this.eventService.findOne(id);
        if (!event) {
            throw new NotFoundException();
        }
        return event;
    }

    @Post()
    @HttpCode(201)
    async createEvent(@Body() event: Event): Promise<Event> {
        return await this.eventService.createOne(event);
    }
}
