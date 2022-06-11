export interface Page {
  page: number;
  total: number;
  nextId: string;
}

export interface PageQuery {
  page?: number;
  length?: number;
  nextId?: string;
}

export interface Paginated<T> {
  data: T[];
  pagination: Page;
}
