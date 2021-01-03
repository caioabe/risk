import { stateStubFactory } from '../../../../spec/fixtures';
import { add, deduct, revokeEligibility } from '../reducers';

describe('when reducing state', () => {
  describe('when adding', () => {
    it('returns a state slice copy with the absolute amount summed to score', () => {
      const stateSlice = stateStubFactory('my-insurance', false, 0)[
        'my-insurance'
      ];

      const newStateSlice = add(stateSlice, -1);

      expect(newStateSlice).toEqual({
        score: 1,
        isEligible: false,
      });
    });
  });

  describe('when deducting', () => {
    it('returns a state slice copy with the absolute amount subtracted to score', () => {
      const stateSlice = stateStubFactory('my-insurance', false, 0)[
        'my-insurance'
      ];

      const newStateSlice = deduct(stateSlice, -1);

      expect(newStateSlice).toEqual({
        score: -1,
        isEligible: false,
      });
    });
  });

  describe('when revoking eligibility', () => {
    it('returns a state slice copy with the isEligible false', () => {
      const stateSlice = stateStubFactory('my-insurance', true, 0)[
        'my-insurance'
      ];

      const newStateSlice = revokeEligibility(stateSlice);

      expect(newStateSlice).toEqual({
        score: 0,
        isEligible: false,
      });
    });
  });
});
