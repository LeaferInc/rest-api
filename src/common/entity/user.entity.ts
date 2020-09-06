import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  BeforeInsert
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { CommonEntity } from '../common.entity';
import { EventEntity } from './event.entity';
import { CuttingEntity } from './cutting.entity';
import { MessageEntity } from './message.entity';
import { ParticipantEntity } from './participant.entity';
import { PlantEntity } from './plant.entity';
import { ApiProperty } from '@nestjs/swagger';
import { PlantCollectionEntity } from './plant-collection.entity';
import { NotificationEntity } from './notification.entity';
import { UserDto, EntrantDto } from '../dto/user.dto';
import { ImageService, ImageType } from 'src/image/image.service';
import * as bcrypt from 'bcryptjs';

export enum Role {
  USER,
  ADMIN
}

@Entity({ name: 'user' })
export class UserEntity extends CommonEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @Column()
  username: string;

  @ApiProperty()
  @Exclude()
  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @ApiProperty()
  @Column({ nullable: true })
  firstname: string;

  @ApiProperty()
  @Column({ nullable: true })
  lastname: string;

  @ApiProperty()
  @Column({ nullable: true })
  birthdate: Date;

  @ApiProperty()
  @Column({ nullable: true })
  biography: string;

  @ApiProperty()
  @Column({ nullable: true })
  location: string;

  @ApiProperty()
  @Column({ nullable: true })
  pictureId: string;

  @ApiProperty()
  @Column({ default: Role.USER })
  role: Role;

  @ApiProperty()
  @Column({ default: false })
  premium: boolean;

  @ApiProperty({ type: () => [PlantEntity] })
  @OneToMany(() => PlantEntity, plant => plant.owner)
  plants: PlantEntity[]; // Plant ownn by user

  @ApiProperty({ type: () => [EventEntity] })
  @OneToMany(
    () => EventEntity,
    event => event.organizer,
  )
  events: EventEntity[];

  @ApiProperty({ type: () => [CuttingEntity] })
  @OneToMany(
    () => CuttingEntity,
    cutting => cutting.owner,
  )
  cuttings: CuttingEntity[];

  @ApiProperty({ type: () => [MessageEntity] })
  @OneToMany(
    () => MessageEntity,
    message => message.user
  )
  messages: MessageEntity[];

  @ApiProperty({ type: () => [CuttingEntity] })
  @ManyToMany(() => CuttingEntity)
  @JoinTable({ name: 'user_favorite_cutting' })
  favoritesCuttings: CuttingEntity[];

  @ApiProperty({ type: () => [ParticipantEntity] })
  @OneToMany(
    () => ParticipantEntity,
    participant => participant.user
  )
  participants: ParticipantEntity[];

  @ApiProperty({ type: () => [EventEntity] })
  @Exclude()
  @ManyToMany(() => EventEntity, event => event.entrants)
  joinedEvents: EventEntity[];

  @ApiProperty()
  @OneToMany(
    () => PlantCollectionEntity,
    plantCollection => plantCollection.user
  )
  plantCollection: PlantCollectionEntity[];

  @ApiProperty()
  @OneToMany(
    () => NotificationEntity,
    notification => notification.notifier
  )
  notifications: NotificationEntity[];
  
  toDto(): UserDto {
    const dto = new UserDto();
    dto.id = this.id;
    dto.email = this.email;
    dto.username = this.username;
    dto.firstname = this.firstname;
    dto.lastname = this.lastname;
    dto.birthdate = this.birthdate;
    dto.biography = this.biography;
    dto.location = this.location;
    dto.role = this.role;
    dto.picture = ImageService.readFile(ImageType.AVATAR, this.pictureId);
    return dto;
  }

  toEntrantDto(): EntrantDto {
    const dto = new EntrantDto();
    dto.id = this.id;
    dto.username = this.username;
    dto.firstname = this.firstname;
    dto.lastname = this.lastname;
    return dto;
  }
}
