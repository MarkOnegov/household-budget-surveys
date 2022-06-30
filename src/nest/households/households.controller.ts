import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Household, HouseholdType } from 'src/common/types/household.types';
import { PageQueryDTO } from '../dto/pagination.dto';
import { HouseholdsService } from './households.service';

@Controller('household')
export class HouseholdsController {
  constructor(private householdsService: HouseholdsService) {}

  @Get()
  find(
    @Query() query: PageQueryDTO,
    @Query('interviewer') interviewer: string,
  ) {
    return this.householdsService.find(query, interviewer);
  }

  @Get(':id/form/:form')
  getFormValues(@Param('id') id: string, @Param('form') form: string) {
    return this.householdsService.getFormValues(id, form);
  }

  @Post()
  createHousehold(@Body() household: HouseholdType) {
    return this.householdsService.create(household);
  }

  @Get(':id/form')
  getProgress(@Param('id') id: string) {
    return this.householdsService.getProgress(id);
  }

  @Put(':id')
  updateHousehold(@Param('id') id: string, @Body() update: Partial<Household>) {
    return this.householdsService.update(id, update);
  }

  @Get(':id')
  export(@Param('id') id: string) {
    return this.householdsService.export(id);
  }
}
