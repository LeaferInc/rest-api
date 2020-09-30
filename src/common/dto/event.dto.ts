/**
 * @author ddaninthe
 */

import { EventEntity } from '../entity/event.entity';
import { IsString, IsNumber, IsDateString, IsBase64, Min, IsNotEmpty } from 'class-validator';
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
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  endDate: Date;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  maxPeople: number;

  @ApiProperty()
  @IsNumber()
  latitude: number;

  @ApiProperty()
  @IsNumber()
  longitude: number;

  @ApiProperty()
  @IsBase64()
  @IsNotEmpty()
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
