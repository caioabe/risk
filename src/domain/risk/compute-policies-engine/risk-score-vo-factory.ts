import { InsurancesScoreState, RiskScoreVO } from '../types';
import { profileFromScoreTranslator } from './profile-from-score-translator';

export const riskScoreVoFactory = (state: InsurancesScoreState): RiskScoreVO =>
  Object.keys(state).reduce<RiskScoreVO>(
    (riskScoreVO, currentStateKey) => ({
      ...riskScoreVO,
      [currentStateKey]: profileFromScoreTranslator(state[currentStateKey]),
    }),
    {},
  );
