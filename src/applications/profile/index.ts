export type ProfileEnum = 'ineligible' | 'economic' | 'regular' | 'responsible';

export type OwnershipStatusType = 'owned' | 'mortgaged';

export interface House {
  ownershipStatus: OwnershipStatusType;
}

export type MaritalStatus = 'married';

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

export interface ProfileVO {
  auto: ProfileEnum;
  disability: ProfileEnum;
  home: ProfileEnum;
  life: ProfileEnum;
}

export type CalculateProfileApplication = (
  command: CalculateProfileCommand,
) => ProfileVO;

// TODO Implement with real functionality
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const calculateProfileApplication: CalculateProfileApplication = (command) => ({
  auto: 'ineligible',
  disability: 'ineligible',
  home: 'ineligible',
  life: 'ineligible',
});

export { calculateProfileApplication };
