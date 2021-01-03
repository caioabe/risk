import { Logger } from '../../infra';
import {
  ALL_INSURANCES,
  MaritalStatusType,
  OwnershipStatusType,
  ProfileType,
} from './enums';

export interface House {
  ownershipStatus: OwnershipStatusType;
}

export type BinaryScore = 0 | 1;

export type RiskQuestions = BinaryScore[];

export interface Vehicle {
  year: number;
}
export interface RiskScoreVO {
  [key: string]: ProfileType;
}

export interface CalculateRiskScoreDto {
  age: number;
  dependents: number;
  houseOwnershipStatus: Maybe<OwnershipStatusType>;
  income: number;
  maritalStatus: MaritalStatusType;
  riskQuestions: RiskQuestions;
  vehicleYear: Maybe<number>;
}

export interface InsuranceScoreStateSlice {
  score: number;
  isEligible: boolean;
}

export interface InsurancesScoreState {
  [key: string]: InsuranceScoreStateSlice;
}

export type IssuedApplication = Pick<
  CalculateRiskScoreDto,
  | 'age'
  | 'dependents'
  | 'houseOwnershipStatus'
  | 'income'
  | 'maritalStatus'
  | 'vehicleYear'
> & {
  baseScore: number;
};

export type ApplyPoliciesInSequentialChain = (
  issuedApplication: IssuedApplication,
  states: InsurancesScoreState,
) => InsurancesScoreState;

export type RiskScorePolicy = {
  name: string;
  compute: ApplyPoliciesInSequentialChain;
};

export type RiskScorePolicies = RiskScorePolicy[];

export type CalculateRiskScoreService = ({
  dto,
  policies,
  insurances,
  logger,
}: {
  dto: CalculateRiskScoreDto;
  policies: RiskScorePolicies;
  insurances: typeof ALL_INSURANCES;
  logger: Logger;
}) => RiskScoreVO;

export interface ComputeBaseScoreDto {
  riskQuestions: RiskQuestions;
}

export type ComputeBaseScoreService = ({
  riskQuestions,
}: ComputeBaseScoreDto) => number;

export type PolicyVisitor = (
  state: InsuranceScoreStateSlice,
  issuedApplication: IssuedApplication,
) => InsuranceScoreStateSlice;
export interface PolicyVisitors {
  [key: string]: PolicyVisitor;
}
