/**
 * @author ddaninthe
 */

import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, MoreThan, Raw, DeleteResult } from 'typeorm';
import { EventEntity } from '../common/entity/event.entity';
import { CreateEventDto } from '../common/dto/event.dto';
import { Role, UserEntity } from 'src/common/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { GeoPosition } from 'geo-position.ts';
import { Pagination } from 'src/common/dto/query.dto';
import { AppTime } from 'src/common/app.time';

@Injectable()
export class EventService {
  private static readonly LIMIT = 30;
  private static readonly MAX_METER_DISTANCE = 10000;

  constructor(@InjectRepository(EventEntity) private readonly eventRepository: Repository<EventEntity>,
    private userService: UserService,) { }

  /**
   * Return all the Events
   */
  async findAll(pagination?: Pagination): Promise<EventEntity[]> {
    const events = await this.eventRepository.find({
      skip: pagination?.skip,
      take: pagination?.take
    });
    return events;
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
  * Finds closest events to the given coordinates
  * @param latitude latitude coordinate to compare
  * @param longitude longitude coordinate to compare
  */
  async findClosest(latitude: number, longitude: number): Promise<EventEntity[]> {
    const from = new GeoPosition(latitude, longitude);

    // Only future events
    const events: EventEntity[] = await this.findAfterDate(AppTime.now());

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
    user.joinedEvents.filter(event => event.startDate > AppTime.now())
      .sort((a, b) => b.startDate.getTime() - a.startDate.getTime())
      .map((event) => {
        event.joined = true; // Indicate that event has been joined
      });
    return user.joinedEvents;
  }

  /**
  * Returns all events organized by the given user
  * @param userId the organizer's id
  */
  findOrganized(userId: number): Promise<EventEntity[]> {
    return this.eventRepository.find({
      where: [
        { organizer: userId },
      ],
      order: {
        startDate: 'DESC',
      },
    });
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
    const event: EventEntity = await this.findOne(eventId, { relations: ['entrants', 'organizer'] });
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

  eventCount() {
    return this.eventRepository.count();
  }

  /**
  * Deletes an event
  * @param eventId the id of the event
  * @param userId the id of the user requesting the deletion
  */
  async deleteEvent(eventId: number, userId: number): Promise<DeleteResult> {
    const event = await this.findOne(eventId, { relations: ['organizer'] });

    // Not found
    if (!event) {
      throw new NotFoundException();
    }

    const user: UserEntity = await this.userService.findOneById(userId);

    // User requesting is not the event organizer
    if (event.organizer.id !== userId && user.role !== Role.ADMIN) {
      throw new UnauthorizedException('Only the organizer can delete his event');
    }

    return this.eventRepository.delete(eventId);
  }
}
