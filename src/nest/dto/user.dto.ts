import { PartialType } from '@nestjs/mapped-types';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { Role } from '../../common/types/user.types';
import { UserEntity } from '../schemas/user.schema';

export class CrateUserDTO implements UserEntity {
  @IsString()
  username: string;
  @IsString()
  password: string;
  @IsString()
  @IsOptional()
  firstName?: string;
  @IsString()
  @IsOptional()
  secondName?: string;
  @IsString()
  @IsOptional()
  lastName?: string;
  @IsEmail()
  email: string;
  @IsArray()
  @IsEnum(Role, { each: true })
  roles: Role[];
}

export class UpdateUserDTO extends PartialType(CrateUserDTO) {}
