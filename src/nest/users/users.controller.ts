import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import {
  PartialUser,
  Role,
  UserWithPassword,
} from '../../common/types/user.types';
import { Roles } from '../auth/roles.decorator';
import { PageQueryDTO } from '../dto/pagination.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':username')
  async get(@Param('username') username: string) {
    return this.usersService.get(username);
  }

  @Get()
  async find(@Query() query: PageQueryDTO) {
    return this.usersService.find(query);
  }

  @Roles(Role.ADMIN)
  @Post()
  async create(@Body() user: UserWithPassword) {
    return this.usersService.createUser(user);
  }

  @Put(':username')
  async update(@Param('username') username: string, @Body() user: PartialUser) {
    return this.usersService.update(username, user);
  }
}
