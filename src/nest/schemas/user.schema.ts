import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role, User } from '../../common/types/user.types';

export const USER_UPDATABLE_FIELDS: (
  | 'password'
  | 'firstName'
  | 'secondName'
  | 'lastName'
  | 'email'
  | 'roles'
  | 'refresh'
)[] = [
  'password',
  'firstName',
  'secondName',
  'lastName',
  'email',
  'roles',
  'refresh',
];

export type UserDocument = UserEntity & Document<any, any, UserEntity>;

@Schema()
export class UserEntity implements User {
  @Prop({ type: String, required: true, unique: true })
  username: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop()
  firstName?: string;

  @Prop()
  secondName?: string;

  @Prop()
  lastName?: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: [String], required: true })
  roles: Role[];

  @Prop()
  refresh?: string;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
