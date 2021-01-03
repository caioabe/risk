import { RiskScorePolicy, PolicyVisitors } from '../types';
import { applyPoliciesInSequentialChain } from '../compute-policies-engine/apply-policies-in-sequential-chain';
import { revokeEligibility } from '../compute-policies-engine/reducers';

const POLICY_VISITORS: PolicyVisitors = {
  home: (state, payload) => {
    const { houseOwnershipStatus } = payload;

    if (!houseOwnershipStatus) return revokeEligibility(state);

    return state;
  },
};

export const houseNonExistencePolicy: RiskScorePolicy = {
  name: 'house-non-existence-policy',
  compute: applyPoliciesInSequentialChain(POLICY_VISITORS),
};
