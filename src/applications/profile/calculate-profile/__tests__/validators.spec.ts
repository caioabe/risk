import { ALL_MARITAL_STATUSES, ALL_OWNERSHIP_STATUSES } from '../types';
import {
  isHouse,
  isVehicle,
  isMaritalStatus,
  isRiskQuestions,
} from '../validators';

describe('validators', () => {
  describe('house validator', () => {
    describe('when is a valid house', () => {
      it('returns true', () => {
        const candidate = {
          ownershipStatus: ALL_OWNERSHIP_STATUSES[0],
        };

        const result = isHouse(candidate);

        expect(result).toBeTruthy();
      });
    });

    describe('when is a house with invalid ownership status', () => {
      it('returns false', () => {
        const candidate = {
          ownershipStatus: 'pawned',
        };

        const result = isHouse(candidate);

        expect(result).toBeFalsy();
      });
    });

    describe('when is not a house', () => {
      it('returns false', () => {
        const candidate = 'anything';

        const result = isHouse(candidate);

        expect(result).toBeFalsy();
      });
    });
  });

  describe('vehicle validator', () => {
    describe('when is a valid vehicle', () => {
      it('returns true', () => {
        const candidate = {
          year: 2019,
        };

        const result = isVehicle(candidate);

        expect(result).toBeTruthy();
      });
    });

    describe('when is a vehicle with invalid year', () => {
      it('returns false', () => {
        const candidate = {
          year: -1,
        };

        const result = isVehicle(candidate);

        expect(result).toBeFalsy();
      });
    });

    describe('when is not a vehicle', () => {
      it('returns false', () => {
        const candidate = 'anything';

        const result = isVehicle(candidate);

        expect(result).toBeFalsy();
      });
    });
  });

  describe('marital status validator', () => {
    describe('when is a valid marital status', () => {
      it('returns true', () => {
        const candidate = ALL_MARITAL_STATUSES[0];

        const result = isMaritalStatus(candidate);

        expect(result).toBeTruthy();
      });
    });

    describe('when is not a valid marital status', () => {
      it('returns false', () => {
        const candidate = 'foreverAlone';

        const result = isMaritalStatus(candidate);

        expect(result).toBeFalsy();
      });
    });
  });

  describe('risk questions validator', () => {
    describe('when is a valid risk questions', () => {
      it('returns true', () => {
        const candidate = [0, 1, 0];

        const result = isRiskQuestions(candidate);

        expect(result).toBeTruthy();
      });
    });

    describe('when is a risk questions with invalid values', () => {
      it('returns false', () => {
        const candidate = [0, 1, -1];

        const result = isRiskQuestions(candidate);

        expect(result).toBeFalsy();
      });
    });

    describe('when is not a valid risk questions', () => {
      it('returns false', () => {
        const candidate = 'anything';

        const result = isRiskQuestions(candidate);

        expect(result).toBeFalsy();
      });
    });
  });
});
