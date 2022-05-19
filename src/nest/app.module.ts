import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import configuration from './configuration';
import { HouseholdsModule } from './households/households.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'angular'),
    }),
    ConfigModule.forRoot({ load: [configuration] }),
    UsersModule,
    AuthModule,
    UsersModule,
    HouseholdsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
