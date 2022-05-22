import { NanoModule } from '@monegov/nano';
import { DynamicModule, Module } from '@nestjs/common';
import { UserWithPassword } from 'src/common/types/user.types';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [NanoModule],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {
  static register(): DynamicModule {
    return {
      module: UsersModule,
      exports: [UsersService],
      imports: [
        NanoModule.forFeature({
          users: {
            users: {
              map: function (doc) {
                if (doc.type !== 'user') {
                  return;
                }
                const {
                  email,
                  roles,
                  username,
                  firstName,
                  lastName,
                  secondName,
                } = doc as unknown as UserWithPassword;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                emit(username, {
                  email,
                  roles,
                  username,
                  firstName,
                  lastName,
                  secondName,
                });
              },
            },
          },
        }),
      ],
      providers: [UsersService],
      controllers: [UsersController],
    };
  }
}
