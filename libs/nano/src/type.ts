export type PaddingResult<T> = {
  data: T[];
  padding: Padding;
};

export type Padding = {
  skip: number;
  count: number;
};
