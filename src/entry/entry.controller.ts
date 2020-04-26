/**
 * @author ddaninthe
 */

import { Controller, Post, Param } from '@nestjs/common';
import { EntryService } from './entry.service';

@Controller('entry')
export class EntryController {
    constructor(private entryService: EntryService) { }

    /**
     * Join a user to an event
     */
    @Post('/join/:event_id')
    async joinEvent(@Param('event_id') eventId: number): Promise<Response> {
        const userId = 1;
        const result = await this.entryService.joinEvent(eventId, userId);
        console.log(result);
        return null;
    }
}
