import { profileFromScoreTranslator } from '../profile-from-score-translator';

describe('when getting profile from score', () => {
  describe('when isEligible flag is false', () => {
    it('returns ineligible', () => {
      const result1 = profileFromScoreTranslator({
        score: -1,
        isEligible: false,
      });
      const result2 = profileFromScoreTranslator({
        score: 9000,
        isEligible: false,
      });

      expect(result1).toEqual('ineligible');
      expect(result2).toEqual('ineligible');
    });
  });

  describe('when isEligible flag is true', () => {
    describe('when score is lesser than or equal to 0', () => {
      it('returns economic', () => {
        const result1 = profileFromScoreTranslator({
          score: -1,
          isEligible: true,
        });
        const result2 = profileFromScoreTranslator({
          score: 0,
          isEligible: true,
        });

        expect(result1).toEqual('economic');
        expect(result2).toEqual('economic');
      });
    });

    describe('when score is between 1 and 2 both inclusive', () => {
      it('returns regular', () => {
        const result1 = profileFromScoreTranslator({
          score: 1,
          isEligible: true,
        });
        const result2 = profileFromScoreTranslator({
          score: 2,
          isEligible: true,
        });

        expect(result1).toEqual('regular');
        expect(result2).toEqual('regular');
      });
    });

    describe('when score is greater than or equal to 3', () => {
      it('returns responsible', () => {
        const result1 = profileFromScoreTranslator({
          score: 3,
          isEligible: true,
        });
        const result2 = profileFromScoreTranslator({
          score: 4,
          isEligible: true,
        });

        expect(result1).toEqual('responsible');
        expect(result2).toEqual('responsible');
      });
    });
  });
});
