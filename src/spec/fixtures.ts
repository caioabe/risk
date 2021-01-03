// I decided to create a function so each invocation has a
// fresh new isolated state

import { InsurancesScoreState, IssuedApplication } from '../domain/risk';

export const stateStubFactory = (
  insuranceType = 'auto',
  isEligible = true,
  score = 0,
): InsurancesScoreState => ({
  [insuranceType]: {
    isEligible,
    score,
  },
});

export const issuedApplicationStubFactory = ({
  age = 0,
  dependents = 0,
  houseOwnershipStatus = null,
  income = 0,
  maritalStatus = 'married' as const,
  vehicleYear = null,
  baseScore = 0,
} = {}): IssuedApplication => ({
  age,
  dependents,
  houseOwnershipStatus,
  income,
  maritalStatus,
  vehicleYear,
  baseScore,
});
