import {
  issuedApplicationStubFactory,
  stateStubFactory,
} from '../../../../spec/fixtures';
import { incomeNonExistencePolicy } from '../income-non-existence-policy';

describe('income non existence policy', () => {
  describe('when getting the policy name', () => {
    it('returns the correct value', () => {
      expect(incomeNonExistencePolicy.name).toEqual(
        'income-non-existence-policy',
      );
    });
  });

  describe('when income does not exist', () => {
    it('revokes eligibility', () => {
      const result = incomeNonExistencePolicy.compute(
        issuedApplicationStubFactory({ income: 0 }),
        stateStubFactory('disability' as const),
      );

      expect(result).toEqual({
        disability: {
          isEligible: false,
          score: 0,
        },
      });
    });
  });
});
