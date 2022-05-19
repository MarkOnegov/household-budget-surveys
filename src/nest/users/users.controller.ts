import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Role } from '../../common/types/user.types';
import { Roles } from '../auth/roles.decorator';
import { PaginationQueryDTO } from '../dto/pagination.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Roles(Role.ADMIN)
  @Get()
  async find(@Query() query: PaginationQueryDTO) {
    return this.usersService.find(query.pageIndex, query.pageSize);
  }

  @Roles(Role.ADMIN)
  @Post()
  async create(@Body() user: unknown) {
    return this.usersService.create(user);
  }

  @Put(':username')
  async update(@Param('username') username: string, @Body() user: unknown) {
    return this.usersService.update(username, user);
  }
}
