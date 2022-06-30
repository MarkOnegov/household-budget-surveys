import { NanoService } from '@monegov/nano';
import { Injectable, NotFoundException } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { DocumentViewParams } from 'nano';
import { PageQuery, Paginated } from 'src/common/types/pagination.types';
import {
  PartialUser,
  User,
  UserWithPassword,
} from 'src/common/types/user.types';

@Injectable()
export class UsersService {
  constructor(private nanoService: NanoService) {}

  async get(username: string) {
    return (
      await this.nanoService.documentScope.view<User>('users', 'users', {
        key: username,
        limit: 1,
      })
    ).rows[0]?.value;
  }

  //TODO: check exists
  async createUser(user: UserWithPassword) {
    user.password = await hash(user.password, 10);
    return this.nanoService.documentScope.insert({ type: 'user', ...user });
  }

  async find(query: PageQuery): Promise<Paginated<User>> {
    if (!query.length) {
      query.length = 10;
    }
    if (!query.page) {
      query.page = 0;
    }
    const viewParams: DocumentViewParams = { limit: query.length + 1 };
    if (query.nextId) {
      viewParams.startkey = query.nextId;
    } else {
      viewParams.skip = query.page * query.length;
    }
    const { total_rows, rows } =
      await this.nanoService.documentScope.view<User>(
        'users',
        'users',
        viewParams,
      );
    return this.getPage(
      rows.map((r) => r.value).slice(0, query.length),
      rows[query.length]?.key,
      query.page,
      total_rows,
      query.length,
    );
  }

  async update(username: string, update: PartialUser) {
    if (update.password) {
      update.password = await hash(update.password, 10);
    }
    const res = await this.nanoService.documentScope.view('users', 'users', {
      key: username,
      include_docs: true,
    });
    if (!res.rows.length) {
      throw new NotFoundException();
    }
    const user = Object.assign(res.rows[0].doc, update);
    return await this.nanoService.documentScope.insert(user);
  }

  private getPage<T>(
    data: T[],
    nextId: string,
    page: number,
    total: number,
    length: number,
    desc?: boolean,
  ): Paginated<T> {
    return {
      data: desc ? data.reverse() : data,
      pagination: { nextId, page, total, length },
    };
  }
}
