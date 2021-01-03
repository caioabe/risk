import {
  add,
  applyPoliciesInSequentialChain,
  deduct,
  revokeEligibility,
} from '../compute-policies-engine';
import { PolicyVisitors } from '../types';

describe('when applying policies in sequential chain', () => {
  it('returns a fully functional compute function', () => {
    const policyVisitors: PolicyVisitors = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      auto: (state, _payload) => add(state, 1),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      home: (state, _payload) => revokeEligibility(state),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      life: (state, _payload) => deduct(state, -1),
      disability: (state, payload) => {
        const addedState = add(state, payload.vehicleYear);
        return revokeEligibility(addedState);
      },
    };

    const computeFunction = applyPoliciesInSequentialChain(policyVisitors);

    const result = computeFunction(
      {
        age: 18,
        baseScore: 0,
        dependents: 0,
        houseOwnershipStatus: 'mortgaged' as const,
        income: 25000,
        maritalStatus: 'single',
        vehicleYear: 2018,
      },
      {
        auto: {
          isEligible: true,
          score: 0,
        },
        home: {
          isEligible: true,
          score: 0,
        },
        life: {
          isEligible: true,
          score: 0,
        },
        disability: {
          isEligible: true,
          score: 0,
        },
      },
    );

    expect(result).toEqual({
      auto: {
        isEligible: true,
        score: 1,
      },
      home: {
        isEligible: false,
        score: 0,
      },
      life: {
        isEligible: true,
        score: -1,
      },
      disability: {
        isEligible: false,
        score: 2018,
      },
    });
  });
});
