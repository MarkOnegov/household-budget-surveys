import { Injectable } from '@nestjs/common';
import { Paginate } from '../../common/types/pagination.types';
import { Role, User } from '../../common/types/user.types';

@Injectable()
export class UsersService {
  constructor() {
    this.findOne('admin').then((admin) => {
      if (!admin) {
        this.create({
          username: 'admin',
          email: 'admin@hbs.ru',
          roles: [Role.ADMIN, Role.USER],
          password: 'admin',
        });
      }
    });
  }

  async findOne(username: string, full?: true): Promise<undefined>;
  async findOne(username: string, full?: boolean): Promise<User | undefined> {
    return undefined;
  }

  async find(pageIndex = 0, pageSize = 10): Promise<Paginate<User>> {
    return { data: [], pagination: { length: 0, pageIndex, pageSize } };
  }

  async update(username: string, user: unknown) {
    return undefined;
  }

  async create(user: unknown) {
    return undefined;
  }
}
