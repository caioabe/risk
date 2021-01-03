import { applyPoliciesInSequentialChain } from '../apply-policies-in-sequential-chain';
import { PolicyVisitor } from '../../types';

describe('when applying policies in sequential chain', () => {
  it('sets up a correct sequential chain', () => {
    const applicableInsurance1 = 'insurance-mars-bunker';
    const applicableInsurance2 = 'insurance-flying-submarine';
    const nonApplicableInsurance = 'insurance-coliving';

    const applicablePolicyVisitor1: PolicyVisitor = jest.fn();
    const applicablePolicyVisitor2: PolicyVisitor = jest.fn();
    const nonApplicablePolicyVisitor: PolicyVisitor = jest.fn();

    const policyVisitors = {
      [applicableInsurance1]: applicablePolicyVisitor1,
      [applicableInsurance2]: applicablePolicyVisitor2,
      [nonApplicableInsurance]: nonApplicablePolicyVisitor,
    };

    const state = {
      [applicableInsurance1]: {
        isEligible: true,
        score: 3,
      },
      [applicableInsurance2]: {
        isEligible: true,
        score: 3,
      },
    };

    const issuedApplication = {
      age: 29,
      baseScore: 0,
      dependents: 0,
      houseOwnershipStatus: null,
      income: 0,
      maritalStatus: 'single' as const,
      vehicleYear: null,
    };

    const chained = applyPoliciesInSequentialChain(policyVisitors);

    chained(issuedApplication, state);

    const expectedStateArg = { isEligible: true, score: 3 };
    const expectedissuedApplicationArg = {
      age: 29,
      baseScore: 0,
      dependents: 0,
      houseOwnershipStatus: null,
      income: 0,
      maritalStatus: 'single',
      vehicleYear: null,
    };

    expect(applicablePolicyVisitor1).toHaveBeenCalledTimes(1);
    expect(applicablePolicyVisitor1).toHaveBeenCalledWith(
      expectedStateArg,
      expectedissuedApplicationArg,
    );

    expect(applicablePolicyVisitor2).toHaveBeenCalledTimes(1);
    expect(applicablePolicyVisitor2).toHaveBeenCalledWith(
      expectedStateArg,
      expectedissuedApplicationArg,
    );

    expect(nonApplicablePolicyVisitor).not.toHaveBeenCalled();
  });
});
