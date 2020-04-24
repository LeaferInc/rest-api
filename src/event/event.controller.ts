/**
 * @author ddaninthe
 */

import { Controller, Get, Post, Body, Param, Request, NotFoundException } from '@nestjs/common';
import { EventService } from './event.service';
import { EventEntity } from '../common/entity/event.entity';
import { EventDto } from 'src/common/dto/event.dto';

@Controller('events')
export class EventController {
    constructor(private eventService: EventService) { }

    /**
     * Returns all {@link Event} or a 404 Status Code if none was present
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
     * Returns a single {@link Event} by its identifier or a 404 Status Code if none was found
     * @param id the identifier of the {@link Event}
     */
    @Get("/:id")
    async getById(@Param() id: number): Promise<EventEntity> {
        const event: EventEntity = await this.eventService.findOne(id);
        if (!event) {
            throw new NotFoundException();
        }
        return event;
    }

    @Post()
    async createEvent(@Body() eventDto: EventDto): Promise<EventEntity> {
        return await this.eventService.createOne(eventDto);
    }
}
