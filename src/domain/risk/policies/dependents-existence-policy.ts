import { RiskScorePolicy, PolicyVisitors } from '../types';
import { applyPoliciesInSequentialChain } from '../compute-policies-engine/apply-policies-in-sequential-chain';
import { add } from '../compute-policies-engine/reducers';

const POLICY_VISITORS: PolicyVisitors = {
  life: (state, payload) => {
    const { dependents } = payload;

    if (dependents > 0) return add(state, 1);

    return state;
  },
  disability: (state, payload) => {
    const { dependents } = payload;

    if (dependents > 0) return add(state, 1);

    return state;
  },
};

export const dependentsExistencePolicy: RiskScorePolicy = {
  name: 'dependents-existence-policy',
  compute: applyPoliciesInSequentialChain(POLICY_VISITORS),
};
