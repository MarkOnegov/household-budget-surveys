import { NanoService } from '@monegov/nano';
import { Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { UserWithPassword } from 'src/common/types/user.types';

@Injectable()
export class UsersService {
  constructor(private nanoService: NanoService) {}

  async createUser(user: UserWithPassword) {
    user.password = await hash(user.password, 10);
    this.nanoService.documentScope.insert({ type: 'user', ...user });
  }
}
