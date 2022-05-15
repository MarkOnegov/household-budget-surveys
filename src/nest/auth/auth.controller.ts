import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { SuccussLogin } from '../../common/types/auth.types';
import { User } from '../../common/types/user.types';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request): Promise<SuccussLogin> {
    return this.authService.login(req.user as User);
  }
}
