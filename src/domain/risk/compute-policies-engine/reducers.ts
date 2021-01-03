import { InsuranceScoreStateSlice } from '../types';

// This can be extracted in the future for memoizing or caching
// in case of expensive computations and / or side-effets like
// consulting bureat's. The startegy would require deeper analyzis
// based on new requirements, but does encourage manipulating
// state only via these specialized reducers

export const revokeEligibility = (
  stateSlice: InsuranceScoreStateSlice,
): InsuranceScoreStateSlice => {
  console.log('🔫 revoking');
  return {
    ...stateSlice,
    isEligible: false,
  };
};

export const add = (
  stateSlice: InsuranceScoreStateSlice,
  amount: number,
): InsuranceScoreStateSlice => {
  console.log('➕ adding', amount);

  return {
    ...stateSlice,
    score: stateSlice.score + Math.abs(amount),
  };
};

export const deduct = (
  stateSlice: InsuranceScoreStateSlice,
  amount: number,
): InsuranceScoreStateSlice => {
  console.log('➖ deducting', amount);

  return {
    ...stateSlice,
    score: stateSlice.score - Math.abs(amount),
  };
};
