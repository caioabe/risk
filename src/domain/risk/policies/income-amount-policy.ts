import { RiskScorePolicy, PolicyVisitors } from '../types';
import { applyPoliciesInSequentialChain } from '../compute-policies-engine/apply-policies-in-sequential-chain';
import { deduct } from '../compute-policies-engine/reducers';

const POLICY_VISITORS: PolicyVisitors = {
  auto: (state, payload) => {
    const { income } = payload;

    if (income < 200000) return deduct(state, 1);

    return state;
  },
  home: (state, payload) => {
    const { income } = payload;

    if (income < 200000) return deduct(state, 1);

    return state;
  },
  life: (state, payload) => {
    const { income } = payload;

    if (income < 200000) return deduct(state, 1);

    return state;
  },
  disability: (state, payload) => {
    const { income } = payload;

    if (income < 200000) return deduct(state, 1);

    return state;
  },
};

export const incomeAmountPolicy: RiskScorePolicy = {
  name: 'income-amount-policy',
  compute: applyPoliciesInSequentialChain(POLICY_VISITORS),
};
