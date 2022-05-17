import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hash } from 'bcryptjs';
import { Model } from 'mongoose';
import { Paginate } from '../../common/types/pagination.types';
import { PartialUser, Role, User } from '../../common/types/user.types';
import {
  UserDocument,
  UserEntity,
  USER_UPDATABLE_FIELDS,
} from '../schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserEntity.name) private userModel: Model<UserDocument>,
  ) {
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

  async findOne(
    username: string | Partial<UserEntity>,
    full?: true,
  ): Promise<UserEntity | undefined>;
  async findOne(
    username: string,
    full?: boolean,
  ): Promise<User | UserEntity | undefined> {
    const user = (
      await (typeof username === 'object'
        ? this.userModel.findOne(username)
        : this.userModel.findOne({ username }))
    )?.toObject();
    if (!user) {
      return undefined;
    }
    if (full) {
      return user;
    }
    const { email, roles, firstName, lastName, secondName } = user as User;
    return {
      email,
      roles,
      username: user.username,
      firstName,
      lastName,
      secondName,
    };
  }

  async find(pageIndex = 0, pageSize = 10): Promise<Paginate<User>> {
    const users = (
      await this.userModel
        .find()
        .sort({ username: 'asc' })
        .skip(pageIndex * pageSize)
        .limit(pageSize)
    ).map((user) => {
      const { email, roles, username, firstName, lastName, secondName } =
        user.toObject() as User;
      return { email, roles, username, firstName, lastName, secondName };
    });
    const length = await this.userModel.count();
    return { data: users, pagination: { length, pageIndex, pageSize } };
  }

  async update(username: string, user: Partial<UserEntity>) {
    if (user.password) {
      user.password = await hash(user.password, 10);
    }
    USER_UPDATABLE_FIELDS.forEach((field) => {
      if (user[field] === undefined) {
        delete user[field];
      }
    });
    const fromDb = await (
      await this.userModel.findOneAndUpdate({ username }, user)
    )?.save();
    if (!fromDb) {
      return undefined;
    }
    const { email, roles, firstName, lastName, secondName } = fromDb;
    return { email, roles, username, firstName, lastName, secondName };
  }

  async create(user: UserEntity) {
    user.password = await hash(user.password, 10);
    const fromDb = (await (
      await new this.userModel(user).save()
    )?.toObject()) as PartialUser;
    if (!fromDb) {
      return undefined;
    }
    const { email, roles, username, firstName, lastName, secondName } = fromDb;
    return { email, roles, username, firstName, lastName, secondName };
  }
}
