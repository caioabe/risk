export const ALL_OWNERSHIP_STATUSES = ['owned', 'mortgaged'] as const;
export type OwnershipStatusType = typeof ALL_OWNERSHIP_STATUSES[number];

export const ALL_MARITAL_STATUSES = ['married', 'single'] as const;
export type MaritalStatusType = typeof ALL_MARITAL_STATUSES[number];

export interface House {
  ownershipStatus: OwnershipStatusType;
}

export type BinaryScore = 0 | 1;

export type RiskQuestions = BinaryScore[];

export interface Vehicle {
  year: number;
}

export const ALL_PROFILES = [
  'ineligible',
  'economic',
  'regular',
  'responsible',
] as const;

export type ProfileType = typeof ALL_PROFILES[number];

export interface RiskScoreVO {
  auto: ProfileType;
  disability: ProfileType;
  home: ProfileType;
  life: ProfileType;
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

export type CalculateRiskScoreService = (
  dto: CalculateRiskScoreDto,
) => RiskScoreVO;

export type RiskScoreStrategy = (
  baseScore: number,
  dto: CalculateRiskScoreDto,
) => ProfileType;
