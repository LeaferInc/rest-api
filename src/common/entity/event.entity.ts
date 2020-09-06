/**
 * @author ddaninthe
 */

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { CommonEntity } from "../common.entity";
import { UserEntity } from "./user.entity";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { EventDto } from "../dto/event.dto";
import { ImageService, ImageType } from "src/image/image.service";

@Entity({ name: 'event' })
export class EventEntity extends CommonEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column()
    description: string;

    @ApiProperty()
    @Column()
    location: string;

    @ApiProperty()
    @Column()
    startDate: Date;

    @ApiProperty()
    @Column()
    endDate: Date;

    @ApiProperty()
    @Column({ default: 0 })
    price: number;

    @ApiProperty()
    @Column()
    maxPeople: number;

    @ApiProperty()
    @Column({ type: 'float8' })
    latitude: number;

    @ApiProperty()
    @Column({ type: 'float8' })
    longitude: number;

    @ApiProperty()
    @Column({ nullable: true })
    pictureId: string;

    @ApiProperty({ type: () => UserEntity })
    @Exclude()
    @ManyToOne(() => UserEntity, organizer => organizer.events, { onDelete: 'CASCADE' })
    organizer: UserEntity;

    @ApiProperty({ type: () => [UserEntity] })
    @Exclude()
    @ManyToMany(() => UserEntity, user => user.joinedEvents)
    @JoinTable({ name: 'entry' })
    entrants: UserEntity[];

    joined?: boolean;

    toDto(): EventDto {
        const dto = new EventDto();
        dto.id = this.id;
        dto.name = this.name;
        dto.description = this.description;
        dto.startDate = this.startDate;
        dto.endDate = this.endDate;
        dto.location = this.location;
        dto.price = this.price;
        dto.maxPeople = this.maxPeople;
        dto.latitude = this.latitude;
        dto.longitude = this.longitude;
        if (this.organizer) dto.organizer = this.organizer.id;
        if (this.joined != null) dto.joined = this.joined;
        if (this.entrants != null) dto.entrants = this.entrants.map((user: UserEntity) => user.toEntrantDto());
        dto.picture = ImageService.readFile(ImageType.EVENT, this.pictureId);
        return dto;
    }
}
