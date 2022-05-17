import { Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { SuccussLogin } from '../../common/types/auth.types';
import { User } from '../../common/types/user.types';
import { UserEntity } from '../schemas/user.schema';
import { AuthService } from './auth.service';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(@Req() req: Request): Promise<SuccussLogin> {
    return this.authService.login(req.user as User);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(200)
  async refresh(@Req() req: Request): Promise<SuccussLogin> {
    return this.authService.refresh((req.user as UserEntity).refresh);
  }
}
