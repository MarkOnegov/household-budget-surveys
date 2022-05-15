import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { LoginForm, SuccussLogin } from '../../common/types/auth.types';
import { User } from '../../common/types/user.types';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOne(username);
    if (user && (await compare(password, user.password))) {
      const { _id, password, ...res } = user;
      return res as User;
    }
    return null;
  }

  async login(credentials: LoginForm): Promise<SuccussLogin> {
    const user = await this.validateUser(
      credentials.username,
      credentials.password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.username, roles: user.roles };
    return { user, access_token: this.jwtService.sign(payload) };
  }
}
