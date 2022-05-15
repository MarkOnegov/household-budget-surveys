import { Body, Controller, Post } from '@nestjs/common';
import { SuccussLogin } from '../../common/types/auth.types';
import { LoginFormDTO } from '../dto/auth.dto';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: LoginFormDTO): Promise<SuccussLogin> {
    return this.authService.login(credentials);
  }
}
