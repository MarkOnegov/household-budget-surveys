import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  HouseholdMemberEntity,
  HouseholdMemberSchema,
} from '../schemas/household-member.schema';
import { HouseholdEntity, HouseholdSchema } from '../schemas/household.schema';
import { HouseholdsController } from './households.controller';
import { HouseholdsService } from './households.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HouseholdEntity.name, schema: HouseholdSchema },
      { name: HouseholdMemberEntity.name, schema: HouseholdMemberSchema },
    ]),
  ],
  controllers: [HouseholdsController],
  providers: [HouseholdsService],
})
export class HouseholdsModule {}
