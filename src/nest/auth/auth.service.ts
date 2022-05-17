import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { v4 } from 'uuid';
import { SuccussLogin } from '../../common/types/auth.types';
import { User } from '../../common/types/user.types';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOne(username, true);
    if (user && (await compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async refresh(refresh?: string): Promise<SuccussLogin> {
    if (!refresh) {
      throw new UnauthorizedException();
    }
    const user = await this.usersService.findOne({ refresh });
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.login(user);
  }

  async login(user: User): Promise<SuccussLogin> {
    if (!user) {
      throw new UnauthorizedException();
    }
    const uuid = v4();

    const { username, roles, email } = user;
    const refresh = this.jwtService.sign(
      { refresh: uuid },
      {
        secret: this.configService.get('security.jwt.refresh.secret'),
        expiresIn: this.configService.get('security.jwt.refresh.expires-in'),
      },
    );
    await this.usersService.update(username, { refresh: uuid });
    return {
      user: { username, roles, email },
      access_token: this.jwtService.sign({ username, roles }),
      refresh_token: refresh,
    };
  }
}
