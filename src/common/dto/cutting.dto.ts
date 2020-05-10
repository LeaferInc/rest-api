import { CuttingEntity } from "../entity/cutting.entity";
import { IsNumber, IsString, IsOptional } from "class-validator";

export class CreateCuttingDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  tradeWith: string;

  toEntity(): CuttingEntity {
    const cutting: CuttingEntity = new CuttingEntity();
    cutting.name = this.name;
    cutting.description = this.description;
    cutting.tradeWith = this.tradeWith;
    return cutting;
  }
}

export class UpdateCuttingDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  tradeWith: string;

  @IsOptional()
  @IsNumber()
  viewsCount: number;
  // ownerId: number;

  public test() {
    return 'test';
  }
}
