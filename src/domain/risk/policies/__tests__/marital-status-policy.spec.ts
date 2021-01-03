import {
  issuedApplicationStubFactory,
  stateStubFactory,
} from '../../../../spec/fixtures';
import { maritalStatusPolicy } from '../marital-status-policy';

describe('dependents existence policy', () => {
  describe('when getting the policy name', () => {
    it('returns the correct value', () => {
      expect(maritalStatusPolicy.name).toEqual('marital-status-policy');
    });
  });

  describe('when insurance is life', () => {
    describe('when is married', () => {
      it('adds 1 score point', () => {
        const result = maritalStatusPolicy.compute(
          issuedApplicationStubFactory({ maritalStatus: 'married' }),
          stateStubFactory('life' as const),
        );

        expect(result).toEqual({
          life: {
            isEligible: true,
            score: 1,
          },
        });
      });
    });
  });

  describe('when insurance is disability', () => {
    describe('when is married', () => {
      it('deducts 1 score point', () => {
        const result = maritalStatusPolicy.compute(
          issuedApplicationStubFactory({ maritalStatus: 'married' }),
          stateStubFactory('disability' as const),
        );

        expect(result).toEqual({
          disability: {
            isEligible: true,
            score: -1,
          },
        });
      });
    });
  });
});
