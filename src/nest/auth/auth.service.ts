import { NanoService } from '@monegov/nano';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { SuccussLogin } from 'src/common/types/auth.types';
import { v4 } from 'uuid';
import { Role } from '../../common/types/user.types';
import { UsersService } from '../users/users.service';
import { Auth, Refresh } from './auth.module';

@Injectable()
export class AuthService {
  constructor(
    private nanoService: NanoService,
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.init();
  }

  async validateUser(username: string, password: string): Promise<Auth> {
    const res = await this.nanoService.documentScope.view<Auth>(
      'users',
      'auth',
      { key: username },
    );
    if (!res.rows.length) {
      throw new UnauthorizedException();
    }
    const user = res.rows[0].value;
    if (!compare(password, user.password)) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async refresh(refresh?: string): Promise<SuccussLogin> {
    if (!refresh) {
      throw new UnauthorizedException();
    }
    const res = await this.nanoService.documentScope.view<Refresh>(
      'users',
      'refresh',
      { key: refresh },
    );
    return this.login(res.rows[0]?.value);
  }

  async login(user?: Auth | Refresh): Promise<SuccussLogin> {
    if (!user) {
      throw new UnauthorizedException();
    }
    const uuid = v4();
    const { username, roles } = user;
    const refresh = this.jwtService.sign(
      { refresh: uuid },
      {
        secret: this.configService.get('security.jwt.refresh.secret'),
        expiresIn: this.configService.get('security.jwt.refresh.expires-in'),
      },
    );
    const res = await this.nanoService.documentScope.view('users', 'auth', {
      key: username,
      include_docs: true,
    });
    if (!res.rows.length) {
      throw new UnauthorizedException();
    }
    const userFromDb = res.rows[0].doc;
    await this.nanoService.documentScope.insert(
      Object.assign(userFromDb, { refresh: uuid }),
    );
    return {
      user: { username, roles },
      access_token: this.jwtService.sign({ username, roles }),
      refresh_token: refresh,
    };
  }

  private init() {
    if (!this.nanoService.documentScope) {
      setTimeout(() => this.init(), 100);
      return;
    }
    setTimeout(
      () =>
        this.nanoService.documentScope
          .view('users', 'auth', { key: 'admin' })
          .then((data) => {
            if (!data.rows.length) {
              this.usersService.createUser({
                email: 'admin@hbs.ru',
                password: 'admin',
                roles: [Role.ADMIN, Role.USER],
                username: 'admin',
              });
            }
          })
          .catch((err) => console.error(err)),
      1000,
    );
  }
}
