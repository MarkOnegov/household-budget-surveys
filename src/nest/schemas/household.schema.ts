import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {
  AdditionalIncome,
  ChildBenefitsType,
  CommunicationPackage,
  DurableProduct,
  ExtraIncome,
  FreeProduct,
  Household,
  HouseholdMember,
  HousingAllowance,
  Income,
  Internet,
  LocalityType,
  MainIncomeSource,
  OperatingProduct,
  TargetedAssistance,
  Telethon,
  Transport,
  TransportExplantation,
  TransportPayment,
  Tv,
  UseMaterialCapital,
} from '../../common/types/household.types';
import { User } from '../../common/types/user.types';

export type HouseholdDocument = HouseholdEntity &
  Document<any, any, HouseholdEntity>;

export class HouseholdEntity implements Household {
  @Prop({ required: true })
  territory: string;
  @Prop({ required: true })
  locality: string;
  @Prop({ required: true })
  okato: string;
  @Prop({ required: true })
  oktmo: string;
  @Prop({ required: true })
  localityType: LocalityType;
  @Prop()
  censusTractNumber?: number;
  @Prop()
  localHouseHoldNumber?: number;
  @Prop()
  surveyStartDate?: Date;
  @Prop()
  surveyStartTime?: Date;
  @Prop()
  surveyEndTime?: Date;
  @Prop()
  interviewer: User;
  @Prop({ type: [Types.ObjectId] })
  members?: HouseholdMember[];
  @Prop()
  materialCapital?: boolean;
  @Prop()
  housingAllowances?: HousingAllowance[];
  @Prop()
  incomeLack?: boolean;
  @Prop()
  targetedAssistance?: TargetedAssistance;
  @Prop()
  childBenefits?: boolean;
  @Prop()
  childBenefitsTypes?: ChildBenefitsType[];
  @Prop()
  income?: Income;
  @Prop()
  mainIncomeSource?: MainIncomeSource;
  @Prop()
  freeProduct?: FreeProduct[];
  @Prop()
  materialCapitalHolder?: boolean;
  @Prop()
  useMaterialCapital?: UseMaterialCapital;
  @Prop()
  additionalIncomes?: AdditionalIncome[];
  @Prop()
  additionalIncomesTotal?: number;
  @Prop()
  useExtraIncome?: boolean;
  @Prop()
  extraIncomes?: ExtraIncome[];
  @Prop()
  extraIncomesTotal?: number;
  @Prop()
  totalIncome?: number;
  @Prop()
  investments?: boolean;
  @Prop()
  investmentsTotal?: number;
  @Prop()
  moneyRest?: boolean;
  @Prop()
  moneyRestTotal?: number;
  @Prop()
  durableProducts?: DurableProduct[];
  @Prop()
  operatingProducts?: OperatingProduct[];
  @Prop()
  tv?: Tv[];
  @Prop()
  telethon?: Telethon[];
  @Prop()
  cellingUserCount?: number;
  @Prop()
  useInternet?: boolean;
  @Prop()
  internetUserCount?: number;
  @Prop()
  internet?: Internet[];
  @Prop()
  communicationPackage?: CommunicationPackage[];
  @Prop()
  transport?: Transport[];
  @Prop()
  transportExplantation?: TransportExplantation[];
  @Prop()
  transportPayment?: TransportPayment[];
}

export const HouseholdSchema = SchemaFactory.createForClass(HouseholdEntity);
