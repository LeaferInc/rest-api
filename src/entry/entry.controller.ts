/**
 * @author ddaninthe
 */

import { Controller, Post, Param, Delete } from '@nestjs/common';
import { EntryService } from './entry.service';

@Controller('entry')
export class EntryController {
    constructor(private entryService: EntryService) { }

    /**
     * Join an event
     */
    @Post('/join/:event_id')
    async joinEvent(@Param() eventId: number): Promise<void> {
        const userId = 1;
        await this.entryService.joinEvent(eventId, userId);
        return;
    }

    /**
     * Unjoin an event
     * @param eventId the Event to unjoin
     */
    @Delete('/join/:event_id')
    async unjoinEvent(@Param() eventId: number): Promise<void> {
        const userId = 1;
        await this.entryService.unjoinEvent(eventId, userId);
        return;
    }
}
