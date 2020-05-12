import { CuttingEntity } from "../entity/cutting.entity";
import { IsNumber, IsString, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

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

  toEntity(): CuttingEntity {
    const cutting: CuttingEntity = new CuttingEntity();
    cutting.name = this.name;
    cutting.description = this.description;
    cutting.tradeWith = this.tradeWith;
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
