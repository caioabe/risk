import { stateStubFactory } from '../../../../spec/fixtures';
import { houseOwnershipPolicy } from '../house-ownership-policy';

describe('house ownership policy', () => {
  describe('when getting the policy name', () => {
    it('returns the correct value', () => {
      expect(houseOwnershipPolicy.name).toEqual('house-ownership-policy');
    });
  });

  describe('when house ownership status is mortgaged', () => {
    describe('when insurance is home', () => {
      it('adds 1 score point', () => {
        const result = houseOwnershipPolicy.compute(
          {
            age: 18,
            dependents: 1,
            houseOwnershipStatus: 'mortgaged',
            income: 0,
            maritalStatus: 'single',
            vehicleYear: null,
            baseScore: 0,
          },
          stateStubFactory('home' as const),
        );

        expect(result).toEqual({
          home: {
            isEligible: true,
            score: 1,
          },
        });
      });
    });

    describe('when insurance is disability', () => {
      it('revokes eligibility', () => {
        const result = houseOwnershipPolicy.compute(
          {
            age: 18,
            dependents: 1,
            houseOwnershipStatus: 'mortgaged',
            income: 0,
            maritalStatus: 'single',
            vehicleYear: null,
            baseScore: 0,
          },
          stateStubFactory('disability' as const),
        );

        expect(result).toEqual({
          disability: {
            isEligible: true,
            score: 1,
          },
        });
      });
    });
  });
});
