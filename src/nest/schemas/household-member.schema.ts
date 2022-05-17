import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {
  AbsentReason,
  EducationOrganizationType,
  EducationStatus,
  EducationType,
  EmploymentStatus,
  FamilyUnit,
  HouseholdMember,
  MaritalStatus,
  Pension,
  PrivilegeType,
  Relationship,
  Sex,
  SocialServiceAdditionalType,
  SocialServiceType,
  SocialSupportType,
  UseSocialServiceType,
} from '../../common/types/household.types';

export type HouseholdMemberDocument = HouseholdMemberEntity &
  Document<any, any, HouseholdMemberEntity>;

export class HouseholdMemberEntity implements HouseholdMember {
  @Prop()
  firstName: string;
  @Prop()
  secondName: string;
  @Prop()
  sex?: Sex;
  @Prop()
  old?: number;
  @Prop()
  relationToResponsiblePerson?: Relationship;
  @Prop({ type: Types.ObjectId })
  parent?: HouseholdMember;
  @Prop()
  maritalStatus?: MaritalStatus;
  @Prop({ type: Types.ObjectId })
  spouse?: HouseholdMember;
  @Prop({
    type: { firstMonth: Number, secondMonth: Number, thirdMonth: Number },
  })
  employmentStatus?: {
    firstMonth: EmploymentStatus;
    secondMonth: EmploymentStatus;
    thirdMonth: EmploymentStatus;
  };
  @Prop()
  educationStatus?: EducationStatus;
  @Prop()
  visitingEducationOrganization?: boolean;
  @Prop()
  educationOrganizationType?: EducationOrganizationType;
  @Prop()
  educationType?: EducationType;
  @Prop()
  absentDays?: number;
  @Prop()
  absentReason?: AbsentReason;
  @Prop({ type: Types.ObjectId })
  familyUnit?: FamilyUnit;
  @Prop()
  pension?: boolean;
  @Prop({ type: [Number] })
  pensionTypes?: Pension[];
  @Prop({ type: [Number] })
  socialSupportType?: SocialSupportType[];
  @Prop()
  useSocialServiceType?: UseSocialServiceType;
  @Prop({ type: [Number] })
  socialServiceType?: SocialServiceType[];
  @Prop({ type: [Number] })
  privilegeType?: PrivilegeType[];
  @Prop({ type: [Number] })
  socialServiceAdditionalType?: SocialServiceAdditionalType[];
}

export const HouseholdMemberSchema = SchemaFactory.createForClass(
  HouseholdMemberEntity,
);
