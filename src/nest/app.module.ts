import { NanoModule } from '@monegov/nano';
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
    NanoModule.forRoot({
      connection: 'http://admin:admin@localhost:5984',
      database: 'hbs',
    }),
    UsersModule.register(),
    AuthModule,
    UsersModule,
    HouseholdsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
