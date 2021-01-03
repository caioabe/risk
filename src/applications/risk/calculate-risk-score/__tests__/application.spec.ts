import { calculateRiskScoreApplication } from '../application';
import { buildCommand } from '../command';

describe('calculate risk score application', () => {
  describe('when inputs are valid', () => {
    it('returns a valid vo', () => {
      const body = {
        age: 61,
        dependents: 0,
        house: {
          ownershipStatus: 'mortgaged',
        },
        income: 25000,
        maritalStatus: 'married',
        riskQuestions: [0, 1, 0],
        vehicle: {
          year: 1989,
        },
      };

      const command = buildCommand(body);

      const result = calculateRiskScoreApplication()(command);

      expect(result).toEqual({
        auto: 'economic',
        disability: 'ineligible',
        home: 'regular',
        life: 'ineligible',
      });
    });
  });

  describe('when an error occurs', () => {
    it('logs the error', () => {
      const logger = { log: jest.fn() };
      // eslint-disable-next-line func-names
      const calculateRiskScoreService = function () {
        throw Error('error message');
      };
      const body = {
        age: 61,
        dependents: 0,
        house: {
          ownershipStatus: 'mortgaged',
        },
        income: 25000,
        maritalStatus: 'married',
        riskQuestions: [0, 1, 0],
        vehicle: {
          year: 1989,
        },
      };

      const command = buildCommand(body);

      expect(() =>
        calculateRiskScoreApplication({
          logger,
          calculateRiskScoreService,
        })(command),
      ).toThrow('error message');
    });
  });
});
