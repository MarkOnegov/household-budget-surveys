import { NanoModule } from '@monegov/nano';
import { Module } from '@nestjs/common';
import { HouseholdsController } from './households.controller';
import { HouseholdsService } from './households.service';

@Module({
  controllers: [HouseholdsController],
  providers: [HouseholdsService],
  imports: [NanoModule.forFeature()],
})
export class HouseholdsModule {}
