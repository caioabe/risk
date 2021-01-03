import {
  issuedApplicationStubFactory,
  stateStubFactory,
} from '../../../../spec/fixtures';
import { vehicleNonExistencePolicy } from '../vehicle-non-existence-policy';

describe('vehicle non existence policy', () => {
  describe('when getting the policy name', () => {
    it('returns the correct value', () => {
      expect(vehicleNonExistencePolicy.name).toEqual(
        'vehicle-non-existence-policy',
      );
    });
  });

  describe('when vehicle does not exist', () => {
    it('revokes eligibility', () => {
      const result = vehicleNonExistencePolicy.compute(
        issuedApplicationStubFactory({ vehicleYear: null }),
        stateStubFactory('auto' as const),
      );

      expect(result).toEqual({
        auto: {
          isEligible: false,
          score: 0,
        },
      });
    });
  });
});
