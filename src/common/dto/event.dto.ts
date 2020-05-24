/**
 * @author ddaninthe
 */

import { EventEntity } from '../entity/event.entity';
import { IsString, IsNumber, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsDateString()
  startDate: Date;

  @ApiProperty()
  @IsDateString()
  endDate: Date;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNumber()
  maxPeople: number;

  @ApiProperty()
  @IsNumber()
  latitude: number;

  @ApiProperty()
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
