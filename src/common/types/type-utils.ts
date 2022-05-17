/* eslint-disable @typescript-eslint/ban-types */
export type RequiredLiteral<T> = {
  [K in keyof T as string extends K
    ? never
    : number extends K
    ? never
    : {} extends Pick<T, K>
    ? never
    : K]: T[K];
};

export type OptionalLiteral<T> = {
  [K in keyof T as string extends K
    ? never
    : number extends K
    ? never
    : {} extends Pick<T, K>
    ? K
    : never]: T[K];
};

export type IndexKeys<T> = string extends keyof T
  ? string
  : number extends keyof T
  ? number
  : never;
