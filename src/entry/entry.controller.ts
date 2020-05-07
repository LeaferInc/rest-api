/**
 * @author ddaninthe
 */

import { Controller, Post, Param, Delete, Get, UseGuards, Request } from '@nestjs/common';
import { EntryService } from './entry.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('entry')
export class EntryController {
    constructor(private entryService: EntryService) { }

    /**
     * Join an event
     */
    @Post('/join/:event_id')
    @UseGuards(JwtAuthGuard)
    async joinEvent(@Request() req: Express.Request, @Param('event_id') eventId: number): Promise<void> {
        await this.entryService.joinEvent(eventId, req.user.userId);
        return;
    }

    /**
     * Unjoin an event
     * @param eventId the Event to unjoin
     */
    @Delete('/join/:event_id')
    @UseGuards(JwtAuthGuard)
    async unjoinEvent(@Request() req: Express.Request, @Param('event_id') eventId: number): Promise<void> {
        await this.entryService.unjoinEvent(eventId, req.user.userId);
        return;
    }

    @Get('/state/:event_id')
    @UseGuards(JwtAuthGuard)
    async getEntryState(@Request() req: Express.Request, @Param('event_id') eventId: number): Promise<boolean> {
        return this.entryService.entryState(eventId, req.user.userId);
    }
}
