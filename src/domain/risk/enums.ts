export const ALL_OWNERSHIP_STATUSES = ['owned', 'mortgaged'] as const;
export type OwnershipStatusType = typeof ALL_OWNERSHIP_STATUSES[number];

export const ALL_MARITAL_STATUSES = ['married', 'single'] as const;
export type MaritalStatusType = typeof ALL_MARITAL_STATUSES[number];

export const ALL_PROFILES = [
  'ineligible',
  'economic',
  'regular',
  'responsible',
] as const;
export type ProfileType = typeof ALL_PROFILES[number];

export const ALL_INSURANCES = ['auto', 'home', 'life', 'disability'] as const;
export type InsuranceType = typeof ALL_INSURANCES[number];
