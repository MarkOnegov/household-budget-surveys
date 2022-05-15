export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

export class User {
  username: string;
  firstName?: string;
  secondName?: string;
  lastName?: string;
  email: string;
  roles: Role[];
}
