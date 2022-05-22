import { NanoModule } from '@monegov/nano';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Role } from 'src/common/types/user.types';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

export type Auth = {
  username: string;
  password: string;
  roles: Role[];
};

export type Refresh = {
  username: string;
  roles: Role[];
  refresh: string;
};

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('security.jwt.secret'),
        signOptions: {
          expiresIn: configService.get('security.jwt.expires-in'),
        },
      }),
    }),
    NanoModule.forFeature({
      users: {
        auth: {
          map: (doc) => {
            if (doc.type !== 'user') {
              return;
            }
            const { username, password, roles } = doc as unknown as Auth;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            emit(username, { username, password, roles });
          },
        },
        refresh: {
          map: (doc) => {
            if (doc.type !== 'user') {
              return;
            }
            const { username, roles, refresh } = doc as unknown as Refresh;
            if (!refresh) {
              return;
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            emit(refresh, { username, roles });
          },
        },
      },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    JwtRefreshStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
