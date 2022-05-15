export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

export interface User {
  username: string;
  firstName?: string;
  secondName?: string;
  lastName?: string;
  email: string;
  roles: Role[];
}

export interface UserWithPassword extends User {
  password: string;
}

export type PartialUser = Partial<UserWithPassword>;
