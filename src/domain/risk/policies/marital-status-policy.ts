import { RiskScorePolicy, PolicyVisitors } from '../types';
import { applyPoliciesInSequentialChain } from '../compute-policies-engine/apply-policies-in-sequential-chain';
import { add, deduct } from '../compute-policies-engine/reducers';

const POLICY_VISITORS: PolicyVisitors = {
  life: (state, payload) => {
    const { maritalStatus } = payload;

    if (maritalStatus === 'married') return add(state, 1);

    return state;
  },
  disability: (state, payload) => {
    const { maritalStatus } = payload;

    if (maritalStatus === 'married') return deduct(state, 1);

    return state;
  },
};

export const maritalStatusPolicy: RiskScorePolicy = {
  name: 'marital-status-policy',
  compute: applyPoliciesInSequentialChain(POLICY_VISITORS),
};
