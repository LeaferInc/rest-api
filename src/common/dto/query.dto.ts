import { IsNumber, IsArray } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class Pagination {
  @ApiProperty()
  @IsNumber()
  skip: number;
  
  @ApiProperty()
  @IsNumber()
  take: number;
}

export class ResultData<T> {
  @ApiProperty({ type: [Object] })
  @IsArray()
  items: Array<T>;

  @ApiProperty()
  @IsNumber()
  count: number;
}