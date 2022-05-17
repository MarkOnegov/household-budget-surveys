import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import configuration from './configuration';
import { UsersModule } from './users/users.module';
import { HouseholdsModule } from './households/households.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../angular'),
    }),
    ConfigModule.forRoot({ load: [configuration] }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('db.mongo.url'),
      }),
    }),
    UsersModule,
    AuthModule,
    UsersModule,
    HouseholdsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
