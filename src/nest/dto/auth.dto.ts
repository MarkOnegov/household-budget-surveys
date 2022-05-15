import { IsString } from 'class-validator';
import { LoginForm } from '../../common/types/auth.types';

export class LoginFormDTO implements LoginForm {
  @IsString()
  username: string;
  @IsString()
  password: string;
}
