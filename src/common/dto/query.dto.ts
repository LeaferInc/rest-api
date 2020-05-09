import { IsNumber, IsArray } from "class-validator";

export class Pagination {
  @IsNumber()
  skip: number;

  @IsNumber()
  take: number;
}

export class ResultData<T> {
  @IsArray()
  items: Array<T>;

  @IsNumber()
  count: number;
}