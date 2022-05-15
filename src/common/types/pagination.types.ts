export interface PaginationQuery {
  pageIndex?: number;
  pageSize?: number;
}

export interface Pagination extends Required<PaginationQuery> {
  length: number;
}

export interface Paginate<T> {
  data: T[];
  pagination: Pagination;
}
