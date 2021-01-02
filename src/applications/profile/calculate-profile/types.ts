export const ALL_PROFILES = [
  'ineligible',
  'economic',
  'regular',
  'responsible',
] as const;
export type ProfileType = typeof ALL_PROFILES[number];

export const ALL_OWNERSHIP_STATUSES = ['owned', 'mortgaged'] as const;
export type OwnershipStatusType = typeof ALL_OWNERSHIP_STATUSES[number];

export const ALL_MARITAL_STATUSES = ['married', 'single'] as const;
export type MaritalStatusType = typeof ALL_MARITAL_STATUSES[number];

export type MaritalStatus = 'married';

export interface House {
  ownershipStatus: OwnershipStatusType;
}

export type RiskQuestions = [boolean, boolean, boolean];

export interface Vehicle {
  year: number;
}

export interface CalculateProfileCommand {
  age: number;
  dependents: number;
  house: House | null;
  income: number;
  maritalStatus: MaritalStatus;
  riskQuestions: RiskQuestions;
  vehicle: Vehicle | null;
}

export interface RequestBody {
  age: number;
  dependents: number;
  house: {
    ownershipStatus: string;
  } | null;
  income: number;
  maritalStatus: string;
  riskQuestions: [number, number, number];
  vehicle: {
    year: number;
  } | null;
}

export interface ProfileVO {
  auto: ProfileType;
  disability: ProfileType;
  home: ProfileType;
  life: ProfileType;
}

export type CalculateProfileApplication = (
  command: CalculateProfileCommand,
) => ProfileVO;
