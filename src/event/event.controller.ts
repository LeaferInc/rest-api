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
} from '@nestjs/common';
import { EventService } from './event.service';
import { EventEntity } from '../common/entity/event.entity';
import { CreateEventDto } from 'src/common/dto/event.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AppTime } from 'src/common/app.time';
import { EventSearchDto } from 'src/common/dto/eventSearch.dto';
import { ResultData } from 'src/common/dto/query.dto';

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
  getAll(@Query('skip') skip: number, @Query('take') take: number): Promise<ResultData<EventEntity>> {
    return this.eventService.findAll({skip, take});
  }

  /**
   * Returns a list of incoming events ordered by start date
   */
  @Get('incoming')
  getIncoming(): Promise<EventEntity[]> {
    return this.eventService.findAfterDate(AppTime.now);
  }

  /**
   * Search for an event
   * @param params a dto which can have several properties depending on the search
   */
  @Get('search')
  searchEventsByDate(@Query() params: EventSearchDto): Promise<EventEntity[]> {
    if (params.keywords) {
      return this.eventService.findByKeywords(params.keywords);
    }
    else if (params.startDate) {
      return this.eventService.findAfterDate(params.startDate);
    }
    else if (params.latitude && params.longitude) {
      return this.eventService.findClosest(params.latitude, params.longitude);
    }
    else throw new BadRequestException('Invalid Query');
  }

  /**
   * Returns the list of all joined events of a user
   */
  @Get('joined')
  @UseGuards(JwtAuthGuard)
  getJoined(@Request() req: Express.Request): Promise<EventEntity[]> {
    return this.eventService.findJoined(req.user.userId);
  }

  /**
   * Returns a single Event by its identifier or a 404 Status Code if none was found
   * @param id the identifier of the Event
   */
  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  getById(
    @Request() req: Express.Request,
    @Param('id') id: number,
  ): Promise<EventEntity> {
    return this.eventService.findOneForUser(id, req.user.userId);
  }

  /**
   * Creates an Event
   * @param eventDto the Event to create
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  async createEvent(
    @Request() req: Express.Request,
    @Body() eventDto: CreateEventDto,
  ): Promise<EventEntity> {
    if (eventDto.startDate > eventDto.endDate) {
      throw new BadRequestException('`startDate` is greater than `endDate`.');
    }
    return await this.eventService.createOne(eventDto, req.user.userId);
  }
}
