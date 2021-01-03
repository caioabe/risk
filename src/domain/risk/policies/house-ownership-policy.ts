import { RiskScorePolicy, PolicyVisitors } from '../types';
import { applyPoliciesInSequentialChain } from '../compute-policies-engine/apply-policies-in-sequential-chain';
import { add } from '../compute-policies-engine/reducers';

const POLICY_VISITORS: PolicyVisitors = {
  home: (state, payload) => {
    const { houseOwnershipStatus } = payload;

    if (houseOwnershipStatus === 'mortgaged') return add(state, 1);

    return state;
  },
  disability: (state, payload) => {
    const { houseOwnershipStatus } = payload;

    if (houseOwnershipStatus === 'mortgaged') return add(state, 1);

    return state;
  },
};

export const houseOwnershipPolicy: RiskScorePolicy = {
  name: 'house-ownership-policy',
  compute: applyPoliciesInSequentialChain(POLICY_VISITORS),
};
