export class Pagination {
  skip: number;
  take: number;
}

export class ResultData<T> {
  items: Array<T>;
  count: number;
}