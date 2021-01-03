import { stateStubFactory } from '../../../../spec/fixtures';
import { houseNonExistencePolicy } from '../house-non-existence-policy';

describe('house non existence policy', () => {
  describe('when getting the policy name', () => {
    it('returns the correct value', () => {
      expect(houseNonExistencePolicy.name).toEqual(
        'house-non-existence-policy',
      );
    });
  });

  describe('when house does not exist', () => {
    it('revokes eligibility', () => {
      const result = houseNonExistencePolicy.compute(
        {
          age: 18,
          dependents: 1,
          houseOwnershipStatus: null,
          income: 0,
          maritalStatus: 'single',
          vehicleYear: null,
          baseScore: 0,
        },
        stateStubFactory('home' as const),
      );

      expect(result).toEqual({
        home: {
          isEligible: false,
          score: 0,
        },
      });
    });
  });
});
