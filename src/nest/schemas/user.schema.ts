import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role, User } from '../../common/types/user.types';

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
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
