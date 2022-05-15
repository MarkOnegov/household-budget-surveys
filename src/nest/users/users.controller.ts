import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Role } from '../../common/types/user.types';
import { Roles } from '../auth/roles.decorator';
import { PaginationQueryDTO } from '../dto/pagination.dto';
import { CrateUserDTO, UpdateUserDTO } from '../dto/user.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async find(@Query() query: PaginationQueryDTO) {
    return this.usersService.find(query.pageIndex, query.pageSize);
  }

  @Roles(Role.ADMIN)
  @Post()
  async create(@Body() user: CrateUserDTO) {
    return this.usersService.create(user);
  }

  @Put(':username')
  async update(
    @Param('username') username: string,
    @Body() user: UpdateUserDTO,
  ) {
    return this.usersService.update(username, user);
  }
}
