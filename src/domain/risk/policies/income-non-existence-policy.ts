import { RiskScorePolicy, PolicyVisitors } from '../types';
import { applyPoliciesInSequentialChain } from '../compute-policies-engine/apply-policies-in-sequential-chain';
import { revokeEligibility } from '../compute-policies-engine/reducers';

const POLICY_VISITORS: PolicyVisitors = {
  disability: (state, payload) => {
    const { income } = payload;

    if (income <= 0) return revokeEligibility(state);

    return state;
  },
};

export const incomeNonExistencePolicy: RiskScorePolicy = {
  name: 'income-non-existence-policy',
  compute: applyPoliciesInSequentialChain(POLICY_VISITORS),
};
