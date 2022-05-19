import { RequiredLiteral } from './type-utils';
import { User } from './user.types';

export enum LocalityType {
  URBAN = 1,
  RURAL = 2,
}

export enum UrbanPopulationType {
  XS = 1,
  S = 2,
  M = 3,
  L = 4,
  XL = 5,
  XXL = 6,
}

export enum RuralPopulationType {
  S = 7,
  M = 8,
  L = 9,
  XL = 10,
}

export type LocalityPopulationType = UrbanPopulationType | RuralPopulationType;
export const LocalityPopulationValues = {
  ...UrbanPopulationType,
  ...RuralPopulationType,
};

export enum Sex {
  MEN = 1,
  WOMEN = 2,
}

export enum Relationship {
  SPOUSE = 1,
  CHILD = 2,
  CHILD_IN_LAW = 3,
  PARENT = 4,
  SPOUSE_PARENT = 5,
  SIBLING = 6,
  GRANDCHILD = 7,
  NEPHEW = 8,
  DISTANT_RELATIVE = 9,
  NON_RELATIVE = 10,
}

export enum MaritalStatus {
  REGISTERED_MARRIAGE = 1,
  UNREGISTERED_MARRIAGE = 2,
  WIDOW = 3,
  DIVORCED = 4,
  BREAK_UP = 5,
  NOT_MARRIED = 6,
}

export enum EmploymentStatus {
  WORKS_ENTERPRISE = 1,
  WORKS_SOLE_TRADER = 2,
  SOLE_TRADER = 3,
  WORKS_RELATIVE = 4,
  WORKS_HOUSE_HOLD = 5,
  SEARCHING_JOB = 6,
  RETIRED = 7,
  STUDENT = 8,
  HOUSEHOLDER = 9,
  DISABLED = 10,
  DOES_NOT_WORK = 11,
}

export enum EducationStatus {
  NO = 1,
  PRIMARY = 2,
  GENERAL = 3,
  SECONDARY_GENERAL = 4,
  SECONDARY_VOCATIONAL = 5,
  HIGHER = 6,
}

export enum EducationOrganizationType {
  PRESCHOOL = 1,
  GENERAL = 2,
  VOCATIONAL = 3,
  HIGHER = 4,
}

export enum EducationType {
  PAID = 1,
  FREE = 2,
}

export enum AbsentReason {
  WORK = 1,
  STUDY__JOB = 2,
  BUSINESS_TRIP__MILITARY_TRAINING = 3,
  VACATION = 4,
  HOSPITALIZATION = 5,
  ENTERED = 6,
  MILITARY_SERVICE = 7,
  OVER = 99,
}

export enum FamilyUnitType {
  ALONE = 1,
  PARENT_CHILD = 2,
  SPOUSE = 3,
  SPOUSE_CHILD = 4,
  CHILD = 5,
  ALONE_CHILD = 6,
}

export interface FamilyUnit {
  type: FamilyUnitType;
  members: HouseholdMember[];
  index?: number;
}

export enum InsurancePensionType {
  OLD = 1,
  DISABILITY = 2,
  SURVIVORSHIP = 3,
}

export enum StatePension {
  SERVICE_LENGTH = 4,
  OLD = 5,
  DISABILITY = 6,
  SURVIVORSHIP = 7,
  SOCIAL = 8,
}

export type Pension = InsurancePensionType | StatePension;
export const PensionValues = { ...InsurancePensionType, ...StatePension };

export enum SocialSupportType {
  WAR_DISABILITY = 1,
  WWII_PARTICIPANT = 2,
  COMBAT_VETERAN = 3,
  ACTIVE_ARMY = 4,
  BESIEGED_LENINGRAD = 5,
  MILITARY_INSTALLATION_WWII = 6,
  FAMILY_MEMBER_WWII = 7,
  DISABILITY_I = 8,
  DISABILITY_II = 9,
  DISABILITY_III = 10,
  CHILD_DISABILITY = 11,
  RADIATION_EXPOSURE = 12,
  HONOR_BADGE = 13,
}

export enum UseSocialServiceType {
  FULL = 1,
  MONETARY = 2,
  NO = 3,
}

export enum SocialServiceType {
  DRUGS = 1,
  SANATORIUM = 2,
  CONCESSIONARY_TRAVEL_SANATORIUM = 3,
  RAILWAY = 4,
}

export enum PrivilegeType {
  LABOUR_VETERAN = 1,
  MILITARY_VETERAN = 2,
  HOME_FRONT_WORKER = 3,
  REPRESSION = 4,
  PENSION = 5,
  ORPHAN = 6,
  RURAL_SPECIALIST = 7,
  RAILWAY_LOCAL = 8,
  STUDENT = 9,
  DONOR = 10,
  OTHER = 11,
}

export enum SocialServiceAdditionalType {
  CONCESSIONARY_TRAVEL_URBAN = 1,
  CONCESSIONARY_TRAVEL_SUBURB = 2,
  CONCESSIONARY_TRAVEL_INTERCITY = 3,
  DRUGS = 4,
  DENTAL_PROSTHETICS = 5,
  SANATORIUM = 6,
  SOCIAL_PROTECTION = 7,
  NATURAL_AID = 8,
  NO = 9,
}
export enum HousingAllowance {
  ACCOUNT_SUBSIDY = 1,
  BILL_SUBSIDY = 2,
  OTHER = 3,
  ELECTRICITY_GAS = 4,
  TELEPHONE = 5,
  GAS = 6,
  TRASH = 7,
  REPAIR = 8,
  NO = 9,
}

export enum TargetedAssistance {
  POOR_FAMILY = 1,
  EXTRAORDINARY_CIRCUMSTANCES = 2,
  NO = 3,
}
export enum ChildBenefitsType {
  MONTHLY = 1,
  MONTHLY_MILITARY = 2,
  ORPHAN = 3,
  PRESCHOOL = 4,
  MILK = 5,
  FOOD_IN_EDUCATION = 6,
  OTHER = 7,
}

export interface HouseholdMember {
  firstName: string;
  secondName: string;
  sex?: Sex;
  old?: number;
  relationToResponsiblePerson?: Relationship;
  parent?: HouseholdMember;
  maritalStatus?: MaritalStatus;
  spouse?: HouseholdMember;
  employmentStatus?: {
    firstMonth: EmploymentStatus;
    secondMonth: EmploymentStatus;
    thirdMonth: EmploymentStatus;
  };
  educationStatus?: EducationStatus;
  visitingEducationOrganization?: boolean;
  educationOrganizationType?: EducationOrganizationType;
  educationType?: EducationType;
  absentDays?: number;
  absentReason?: AbsentReason;
  familyUnit?: FamilyUnit;

  pension?: boolean;
  pensionTypes?: Pension[];
  socialSupportType?: SocialSupportType[];
  useSocialServiceType?: UseSocialServiceType;
  socialServiceType?: SocialServiceType[];
  privilegeType?: PrivilegeType[];
  socialServiceAdditionalType?: SocialServiceAdditionalType[];
}

export type CreateHouseholdMember = RequiredLiteral<HouseholdMember>;

export enum MainIncomeSource {
  WORK = 1,
  HOUSEHOLD = 2,
  GRANT = 3,
  PENSION = 4,
  BENEFITS = 5,
  ANOTHER_SATE = 6,
  SAVING = 7,
  RENT = 8,
  DEPENDENT = 9,
  OTHER = 10,
}

export enum Income {
  LESS_5K = 1,
  LESS_10K = 2,
  LESS_15K = 3,
  LESS_20K = 4,
  LESS_25K = 5,
  LESS_30K = 6,
  LESS_40K = 7,
  LESS_50K = 8,
  LESS_60K = 9,
  LESS_75K = 10,
  LESS_100K = 11,
  LESS_125K = 12,
  LESS_150K = 13,
  LESS_175K = 14,
  LESS_200K = 15,
  LESS_250K = 16,
  MORE_250K = 17,
  FIND_DIFFICULT = -7,
}

export enum FreeProductType {
  CORN = 1,
  FOOD = 2,
  NON_FOOD = 3,
  FREE_FOOD = 4,
  TRANSPORT = 5,
  CELLULAR = 6,
  HOUSING = 7,
  REPAIR = 8,
  MEDICINE = 9,
  PRESCHOOL = 10,
  EDUCATION = 11,
  SPORT = 12,
  LEISURE = 13,
}

export type FreeProduct = {
  type: FreeProductType;
  cost: number | Income;
};

export type UseMaterialCapital = {
  materialCapital?: number;
  monthlySecondChild?: number;
};

export enum AdditionalIncome {
  LIFE_INSURANCE = 1,
  OTHER_INSURANCE = 2,
  GIFT = 3,
  INHERITANCE = 4,
  LOTTERY = 5,
  EXTRAORDINARY_CIRCUMSTANCES = 6,
}

export enum ExtraIncome {
  ACCOUNT = 1,
  SAVING = 2,
  SECURITIES = 3,
  POSSESSIONS = 4,
  PROPERTY = 5,
  CREDIT = 6,
  DEBT_RETURN = 7,
  DEBT = 8,
  OTHER = 9,
}

export interface DurableProduct {
  name: string;
  code: number;
  cost: number;
  additionalCost: number;
}

export enum OperatingProductName {
  KITCHEN = 1,
  LAUNDRY = 2,
  AIR_CONDITIONING = 3,
  VACUUM_CLEANER = 4,
  SEWING = 5,
  COKING = 6,
  REST = 7,
  COMMUNICATION = 8,
}

export type OperatingProduct = {
  name: OperatingProductName;
  code: number;
  hasOperationCost: boolean;
  operationCost: number;
  hasMaintenanceCost: boolean;
  maintenanceCost: number;
};

export enum TvType {
  COLLECTIVE = 1,
  RECEIVER = 2,
  ANTENNA = 3,
  NO = 99,
}

export type Tv = {
  type: TvType;
  payment: boolean;
};

export enum TelethonType {
  STATIONARY = 1,
  CELLING = 2,
  NO = 99,
}

export type Telethon = {
  type: Telethon;
  payment: boolean;
};

export enum InternetType {
  WIRED = 1,
  MOBILE_HOME = 2,
  MOBILE_EVERYWHERE = 3,
  WIFI_HOME = 4,
  WIFI_EVERYWHERE_PAID = 5,
  WIFI_EVERYWHERE_FREE = 6,
  FROM_STUDY_OR_WORK = 7,
}

export type Internet = {
  type: InternetType;
  payment: boolean;
};

export enum CommunicationPackageType {
  COLLECTIVE_ANTENNA = 1,
  RECEIVER = 2,
  STATIONARY_TELETHON = 3,
  CELLING_TELETHON = 4,
  INTERNET = 5,
  STATIONARY_TELETHON__INTERNET = 6,
  CELLING_TELETHON__INTERNET = 7,
  TV__INTERNET = 8,
  TV__INTERNET__TELETHON = 9,
}

export type CommunicationPackage = {
  type: CommunicationPackageType;
  cost: number;
};

export enum TransportType {
  CAR = 1,
  BUS = 2,
  TRUCK = 3,
  ATV = 4,
  MOTORCYCLE = 5,
  POWERBOAT = 6,
  GARAGE = 7,
  PARKING = 8,
}

export type Transport = {
  type: TransportType;
  total: number;
  use: number;
  boughtPerQuarter: boolean;
  cost: number;
};

export enum TransportExplantationType {
  GAS = 1,
  PARKING = 2,
  CLEANING = 3,
  SPARE_PARTS = 4,
  GARAGE = 5,
}

export type TransportExplantation = {
  type: TransportExplantationType;
  cost: number;
};

export enum TransportPaymentType {
  TAX = 1,
  CIVIL_LIABILITY_INSURANCE = 2,
  VOCALITY_INSURANCE = 3,
  OTHER_FEES = 4,
  TICKET = 5,
  REPAIR = 6,
  EQUIPMENT = 7,
  RENT = 8,
}

export type TransportPayment = {
  type: TransportPaymentType;
  cost: number;
};

export interface Household {
  territory: string;
  locality: string;
  okato: string;
  oktmo: string;
  localityType: LocalityType;
  censusTractNumber?: number;
  localHouseHoldNumber?: number;
  surveyStartDate?: Date;
  surveyStartTime?: Date;
  surveyEndTime?: Date;
  interviewer: User;

  members?: HouseholdMember[];
  materialCapital?: boolean;

  housingAllowances?: HousingAllowance[];
  incomeLack?: boolean;
  targetedAssistance?: TargetedAssistance;
  childBenefits?: boolean;
  childBenefitsTypes?: ChildBenefitsType[];

  income?: Income;
  mainIncomeSource?: MainIncomeSource;
  freeProduct?: FreeProduct[];
  materialCapitalHolder?: boolean;
  useMaterialCapital?: UseMaterialCapital;
  additionalIncomes?: AdditionalIncome[];
  additionalIncomesTotal?: number | Income;
  useExtraIncome?: boolean;
  extraIncomes?: ExtraIncome[];
  extraIncomesTotal?: number | Income;
  totalIncome?: number | Income;
  investments?: boolean;
  investmentsTotal?: number | Income;
  moneyRest?: boolean;
  moneyRestTotal?: number | Income;

  durableProducts?: DurableProduct[];
  operatingProducts?: OperatingProduct[];
  tv?: Tv[];
  telethon?: Telethon[];
  cellingUserCount?: number;
  useInternet?: boolean;
  internetUserCount?: number;
  internet?: Internet[];
  communicationPackage?: CommunicationPackage[];
  transport?: Transport[];
  transportExplantation?: TransportExplantation[];
  transportPayment?: TransportPayment[];
}

export type CreateHousehold = RequiredLiteral<Household>;
