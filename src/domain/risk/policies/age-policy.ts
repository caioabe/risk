import { RiskScorePolicy, PolicyVisitors } from '../types';
import { applyPoliciesInSequentialChain } from '../compute-policies-engine/apply-policies-in-sequential-chain';
import { deduct, revokeEligibility } from '../compute-policies-engine/reducers';

// If this class happens to get bigger
// I'd extract Visitors to more granular structures
// Maybe using a builder on a higher level (some application)
// based on simple configuration inputs on demand to allow
// extensibility and customization without changing the engine
// Hypothetically:
// { age-policy: ['auto', 'home'] }
// or
// { age-policy: omit: { ['disability'] } }
// or
// { age-policy: disability: { ...customTweaks } } }
// This would even be a possible candidate for a new system
// in the future, optimized for faster changing requirements

const POLICY_VISITORS: PolicyVisitors = {
  // Unfortunatelly there's no such thing as pattern matching in TS
  auto: (state, payload) => {
    const { age } = payload;
    if (age < 30) return deduct(state, 2);
    if (age >= 30 && age < 40) return deduct(state, 1);

    return state;
  },
  home: (state, payload) => {
    const { age } = payload;
    if (age < 30) return deduct(state, 2);
    if (age >= 30 && age < 40) return deduct(state, 1);

    return state;
  },
  life: (state, payload) => {
    const { age } = payload;
    if (age < 30) return deduct(state, 2);
    if (age >= 30 && age < 40) return deduct(state, 1);
    if (age > 60) return revokeEligibility(state);

    return state;
  },
  disability: (state, payload) => {
    const { age } = payload;
    if (age < 30) return deduct(state, 2);
    if (age >= 30 && age < 40) return deduct(state, 1);
    if (age > 60) return revokeEligibility(state);

    return state;
  },
};

export const agePolicy: RiskScorePolicy = {
  name: 'age-policy',
  compute: applyPoliciesInSequentialChain(POLICY_VISITORS),
};
