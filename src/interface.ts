export interface ListResponseInt {
  [key: string]: string | number;
}

export interface PaginationInt {
  totalElements:number
  totalPages: number;
  currentPage: number;
  next: number;
  prev: number;
  pageSize: number
}
