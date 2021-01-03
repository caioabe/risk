import { computeBaseScoreService } from '../compute-base-score-service';

describe('when computing base score', () => {
  describe('when all binary answers are falsy', () => {
    it('returns 0', () => {
      const result = computeBaseScoreService({ riskQuestions: [0, 0, 0] });

      expect(result).toEqual(0);
    });
  });

  describe('when all binary answers are thuthy', () => {
    it('returns 3', () => {
      const result = computeBaseScoreService({ riskQuestions: [1, 1, 1] });

      expect(result).toEqual(3);
    });
  });

  describe('when only one binary answers is thuthy', () => {
    it('returns 1', () => {
      const result = computeBaseScoreService({ riskQuestions: [1, 0, 0] });

      expect(result).toEqual(1);
    });
  });

  describe('when only one binary answers is falsy', () => {
    it('returns 2', () => {
      const result = computeBaseScoreService({ riskQuestions: [1, 1, 0] });

      expect(result).toEqual(2);
    });
  });
});
