/**
 * @author ddaninthe
 */

import { EventEntity } from '../entity/event.entity';
import { IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  location: string;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  @IsNumber()
  price: number;

  @IsNumber()
  maxPeople: number;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  toEntity(): EventEntity {
    const event: EventEntity = new EventEntity();
    event.name = this.name;
    event.description = this.description;
    event.location = this.location;
    event.startDate = this.startDate;
    event.endDate = this.endDate;
    event.latitude = this.latitude;
    event.longitude = this.longitude;
    event.price = this.price;
    event.maxPeople = this.maxPeople;
    return event;
  }
}
