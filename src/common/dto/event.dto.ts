/**
 * @author ddaninthe
 */

import { EventEntity } from '../entity/event.entity';
import { IsString, IsNumber, IsDateString, IsBase64 } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AppTime } from '../app.time';
import { ImageService, ImageType } from 'src/image/image.service';
import { EntrantDto } from './user.dto';

export class EventDto {
  id: number;
  name: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
  price: number;
  maxPeople: number;
  latitude: number;
  longitude: number;
  organizer: number;
  joined?: boolean;
  picture: string;
  entrants: EntrantDto[];
}

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

  @ApiProperty()
  @IsBase64()
  picture: string;

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
    event.pictureId = ImageService.saveFile(ImageType.EVENT, 'event_' + AppTime.now().getTime(), this.picture);
    return event;
  }
}
