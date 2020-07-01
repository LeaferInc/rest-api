import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { CommonEntity } from '../common.entity';
import { UserEntity } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { CuttingDto } from '../dto/cutting.dto';
import { ImageService, ImageType } from 'src/image/image.service';

@Entity({ name: 'cutting' })
export class CuttingEntity extends CommonEntity {
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
  @Column({ nullable: true })
  tradeWith: string;

  @ApiProperty()
  @Column({ default: 0 })
  viewsCount: number;

  @ApiProperty()
  @Column({ nullable: true })
  pictureId: string;

  @ApiProperty({ type: () => UserEntity })
  @ManyToOne(
    () => UserEntity,
    owner => owner.cuttings,
  )
  owner: UserEntity;

  @ApiProperty()
  @RelationId((cutting: CuttingEntity) => cutting.owner)
  ownerId: number;

  toDto(): CuttingDto {
    const dto = new CuttingDto();
    dto.id = this.id;
    dto.name = this.name;
    dto.description = this.description;
    dto.tradeWith = this.tradeWith;
    dto.viewsCount = this.viewsCount;
    dto.ownerId = this.ownerId;
    dto.picture = ImageService.readFile(ImageType.CUTTING, this.pictureId);
    return dto;
  }
}
