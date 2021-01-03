import moment from 'moment';
import { RiskScorePolicy, PolicyVisitors } from '../types';
import { applyPoliciesInSequentialChain } from '../compute-policies-engine/apply-policies-in-sequential-chain';
import { add } from '../compute-policies-engine/reducers';

const POLICY_VISITORS: PolicyVisitors = {
  auto: (state, payload) => {
    const { vehicleYear } = payload;

    const today = moment();
    const vehicleDate = moment(vehicleYear?.toString());
    const yearsDiff = today.diff(vehicleDate, 'years');

    if (yearsDiff <= 5) return add(state, 1);

    return state;
  },
};

export const vehicleYearPolicy: RiskScorePolicy = {
  name: 'vehicle-year-policy',
  compute: applyPoliciesInSequentialChain(POLICY_VISITORS),
};
