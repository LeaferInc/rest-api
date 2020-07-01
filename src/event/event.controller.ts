/**
 * @author ddaninthe
 */

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  BadRequestException,
  UseGuards,
  Request,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { EventService } from './event.service';
import { EventEntity } from '../common/entity/event.entity';
import { CreateEventDto, EventDto } from 'src/common/dto/event.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AppTime } from 'src/common/app.time';
import { EventSearchDto } from 'src/common/dto/eventSearch.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter, File } from 'src/common/file';

@ApiBearerAuth()
@Controller('events')
export class EventController {
  constructor(private eventService: EventService) { }

  /**
   * Gets all Events
   * @returns an array of events
   * @throws NotFoundException if none was present
   */
  @Get()
  async getAll(): Promise<EventDto[]> {
    return (await this.eventService.findAll()).map((e: EventEntity) => e.toDto());
  }

  /**
   * Returns a list of incoming events ordered by start date
   */
  @Get('incoming')
  async getIncoming(): Promise<EventDto[]> {
    return (await this.eventService.findAfterDate(AppTime.now)).map((e: EventEntity) => e.toDto());
  }

  /**
   * Search for an event
   * @param params a dto which can have several properties depending on the search
   */
  @Get('search')
  async searchEventsByDate(@Query() params: EventSearchDto): Promise<EventDto[]> {
    let res: EventEntity[];
    if (params.keywords) {
      res = await this.eventService.findByKeywords(params.keywords);
    }
    else if (params.startDate) {
      res = await this.eventService.findAfterDate(params.startDate);
    }
    else if (params.latitude && params.longitude) {
      res = await this.eventService.findClosest(params.latitude, params.longitude);
    }
    else throw new BadRequestException('Invalid Query');

    return res.map((e: EventEntity) => e.toDto());
  }

  /**
   * Returns the list of all joined events of a user
   */
  @Get('joined')
  @UseGuards(JwtAuthGuard)
  async getJoined(@Request() req: Express.Request): Promise<EventDto[]> {
    return (await this.eventService.findJoined(req.user.userId)).map((e: EventEntity) => e.toDto());
  }

  /**
   * Returns a single Event by its identifier or a 404 Status Code if none was found
   * @param req the request object
   * @param res the response object
   * @param id the identifier of the Event
   */
  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getById(@Request() req: Express.Request, @Param('id') id: number): Promise<EventDto> {
    return (await this.eventService.findOneForUser(id, req.user.userId)).toDto();
  }

  /**
   * Creates an Event
   * @param eventDto the Event to create
   */
  @Post()
  @UseInterceptors(FileInterceptor('picture', { fileFilter: fileFilter }))
  @UseGuards(JwtAuthGuard)
  async createEvent(
    @Request() req: Express.Request,
    @Body() eventDto: CreateEventDto,
    @UploadedFile() picture: File,
  ): Promise<EventDto> {
    if (eventDto.startDate > eventDto.endDate) {
      throw new BadRequestException('`startDate` is greater than `endDate`.');
    }
    return (await this.eventService.createOne(eventDto, req.user.userId, picture)).toDto();
  }
}
