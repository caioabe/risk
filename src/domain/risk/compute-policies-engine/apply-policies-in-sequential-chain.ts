/* eslint-disable no-console */
import {
  InsurancesScoreState,
  ApplyPoliciesInSequentialChain,
  IssuedApplication,
  PolicyVisitor,
  PolicyVisitors,
} from '../types';

const findApplicable = (
  visitors: PolicyVisitors,
  criteria: string,
): PolicyVisitor | undefined => visitors[criteria];

const filterAndApplyVisitor = (
  visitors: PolicyVisitors,
  initialState: InsurancesScoreState,
  configuration: IssuedApplication,
) => (
  newState: InsurancesScoreState,
  insuranceKey: string,
): InsurancesScoreState => {
  const visitor = findApplicable(visitors, insuranceKey);

  const newStateSlice = initialState[insuranceKey];

  if (!visitor) return { ...newState, [insuranceKey]: { ...newStateSlice } };

  const mergedState = {
    ...newState,
    [insuranceKey]: {
      ...visitor(newStateSlice, configuration),
    },
  };

  // Just for presentation concers
  console.log(
    `|------------------------------- ${insuranceKey.toLocaleUpperCase()}`,
  );
  console.log('| Next State:', mergedState);

  return mergedState;
};

const computeByInsurance = (
  insuranceKeys: string[],
  policyVisitors: PolicyVisitors,
  newState: InsurancesScoreState,
  issuedApplication: IssuedApplication,
) =>
  insuranceKeys.reduce<InsurancesScoreState>(
    filterAndApplyVisitor(policyVisitors, newState, issuedApplication),
    {},
  );

// I decided to create a sequential chain to apply
// the policies since there's no case of heavy computation yet
// On top of that I'd like to postone the decision of
// working with concurrent computations since it would add
// more complexity in terms of locks and race conditions
// In other words, I preffered to keep it simple to ensure
// integrity of business rules compositions
export const applyPoliciesInSequentialChain = (
  policyVisitors: PolicyVisitors,
): ApplyPoliciesInSequentialChain => (issuedApplication, newState) => {
  const insuranceKeys = Object.keys(newState);

  return computeByInsurance(
    insuranceKeys,
    policyVisitors,
    newState,
    issuedApplication,
  );
};
