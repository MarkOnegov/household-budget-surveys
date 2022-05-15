import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hash } from 'bcryptjs';
import { Model } from 'mongoose';
import { Role } from '../../common/types/user.types';
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

  async create(user: UserEntity) {
    user.password = await hash(user.password, 10);
    return await (await new this.userModel(user).save())?.toObject();
  }
}
