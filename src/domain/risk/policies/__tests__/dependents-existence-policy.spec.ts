import {
  issuedApplicationStubFactory,
  stateStubFactory,
} from '../../../../spec/fixtures';
import { dependentsExistencePolicy } from '../dependents-existence-policy';

describe('dependents existence policy', () => {
  describe('when getting the policy name', () => {
    it('returns the correct value', () => {
      expect(dependentsExistencePolicy.name).toEqual(
        'dependents-existence-policy',
      );
    });
  });

  describe('when insurance is disability', () => {
    describe('when has dependents', () => {
      it('revokes eligibility', () => {
        const result = dependentsExistencePolicy.compute(
          issuedApplicationStubFactory({ dependents: 1 }),
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

  describe('when insurance is life', () => {
    describe('when has dependents', () => {
      it('revokes eligibility', () => {
        const result = dependentsExistencePolicy.compute(
          issuedApplicationStubFactory({ dependents: 1 }),
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
});
