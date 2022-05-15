import { User } from './user.types';

export interface SuccussLogin {
  user: User;
  access_token: string;
}

export interface LoginForm {
  username: string;
  password: string;
}
