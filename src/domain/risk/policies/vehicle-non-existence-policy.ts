import { RiskScorePolicy, PolicyVisitors } from '../types';
import { applyPoliciesInSequentialChain } from '../compute-policies-engine/apply-policies-in-sequential-chain';
import { revokeEligibility } from '../compute-policies-engine/reducers';

const POLICY_VISITORS: PolicyVisitors = {
  auto: (state, payload) => {
    const { vehicleYear } = payload;

    if (!vehicleYear) return revokeEligibility(state);

    return state;
  },
};

export const vehicleNonExistencePolicy: RiskScorePolicy = {
  name: 'vehicle-non-existence-policy',
  compute: applyPoliciesInSequentialChain(POLICY_VISITORS),
};
