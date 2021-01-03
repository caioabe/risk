import { ProfileType } from '../enums';
import { InsuranceScoreStateSlice } from '../types';

// This could be a policy too. However, in IMHO,
// in essence it seems different from other policies,
// resembling a case of ML / AI exercise results
// That is the reason why I extracted it to cleary
// run it to create the initial state
export const profileFromScoreTranslator = (
  currentStateSlice: InsuranceScoreStateSlice,
): ProfileType => {
  const { isEligible, score } = currentStateSlice;

  if (!isEligible) return 'ineligible';
  if (score <= 0) return 'economic';
  if (score >= 1 && score <= 2) return 'regular';

  return 'responsible';
};
