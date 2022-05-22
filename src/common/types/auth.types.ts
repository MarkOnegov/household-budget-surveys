import { Role } from './user.types';

export interface SuccussLogin {
  user: { username: string; roles: Role[] };
  access_token: string;
  refresh_token: string;
}

export interface Refresh {
  refresh_token: string;
}

export interface LoginForm {
  username: string;
  password: string;
}
