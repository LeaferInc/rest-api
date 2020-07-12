import { CuttingEntity } from "../entity/cutting.entity";
import { IsNumber, IsString, IsOptional, IsBase64 } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { ImageService, ImageType } from "src/image/image.service";
import { AppTime } from "../app.time";

export class CuttingDto {
  id: number;
  name: string;
  description: string;
  tradeWith: string;
  viewsCount: number;
  picture: string;
  ownerId: number;
}

export class CreateCuttingDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  tradeWith?: string;

  @ApiProperty()
  @IsBase64()
  picture: string;

  toEntity(): CuttingEntity {
    const cutting: CuttingEntity = new CuttingEntity();
    cutting.name = this.name;
    cutting.description = this.description;
    cutting.tradeWith = this.tradeWith;
    cutting.pictureId = ImageService.saveFile(ImageType.CUTTING, 'cutting_' + AppTime.now().getTime(), this.picture);
    return cutting;
  }
}

export class UpdateCuttingDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  tradeWith: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  viewsCount: number;
  // ownerId: number;
}
