import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hash } from 'bcryptjs';
import { Model } from 'mongoose';
import { Paginate } from '../../common/types/pagination.types';
import { PartialUser, Role, User } from '../../common/types/user.types';
import { UserDocument, UserEntity } from '../schemas/user.schema';

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

  async findOne(username: string) {
    const user = await this.userModel.findOne({ username });
    if (!user) {
      return undefined;
    }
    return user.toObject();
  }

  async find(pageIndex = 0, pageSize = 10): Promise<Paginate<User>> {
    const users = (
      await this.userModel
        .find()
        .sort({ username: 'asc' })
        .skip(pageIndex * pageSize)
        .limit(pageSize)
    ).map((user) => {
      const fromDb = user.toObject() as PartialUser;
      delete fromDb.password;
      return fromDb as User;
    });
    const length = await this.userModel.count();
    return { data: users, pagination: { length, pageIndex, pageSize } };
  }

  async update(username: string, user: PartialUser) {
    if (user.password) {
      user.password = await hash(user.password, 10);
    }
    return (
      await this.userModel.findOneAndUpdate({ username }, user)
    )?.toObject();
  }

  async create(user: UserEntity) {
    user.password = await hash(user.password, 10);
    if (!user.roles.includes(Role.USER)) {
      user.roles.push(Role.USER);
    }
    const fromDb = (await (
      await new this.userModel(user).save()
    )?.toObject()) as PartialUser;
    if (!fromDb) {
      return undefined;
    }
    delete fromDb.password;
    return fromDb as User;
  }
}
