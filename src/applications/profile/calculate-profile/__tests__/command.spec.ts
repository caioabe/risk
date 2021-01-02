import { buildCommand } from '../command';
import { RequestBody } from '../types';

describe('command', () => {
  describe('when building command', () => {
    describe('when all attributes are present and valid', () => {
      it('returns a built command', () => {
        const body = {
          age: 2,
          dependents: 0,
          house: {
            ownershipStatus: 'owned',
          },
          income: 0,
          maritalStatus: 'married',
          riskQuestions: [0, 0, 0],
          vehicle: {
            year: 2019,
          },
        };

        const result = buildCommand(body);

        expect(result).toEqual({
          age: 2,
          dependents: 0,
          house: {
            ownershipStatus: 'owned',
          },
          income: 0,
          maritalStatus: 'married',
          riskQuestions: [0, 0, 0],
          vehicle: { year: 2019 },
        });
      });
    });

    describe('when all required attributes are present and valid', () => {
      it('returns a built command', () => {
        const body = {
          age: 2,
          dependents: 0,
          house: null,
          income: 0,
          maritalStatus: 'married',
          riskQuestions: [0, 0, 0],
          vehicle: null,
        };

        const result = buildCommand(body);

        expect(result).toEqual({
          age: 2,
          dependents: 0,
          house: null,
          income: 0,
          maritalStatus: 'married',
          riskQuestions: [0, 0, 0],
          vehicle: null,
        });
      });
    });

    describe('when any attribute is invalid', () => {
      it('returns throws an error describing each validation error', () => {
        const body = {} as RequestBody;

        const expectedErrorMessage = `Calculate Profile Command errors:
Invalid age undefined. Required a positive integer.
Invalid dependents undefined. Required a positive integer.
Invalid house undefined. Required a valid ownershipStatus owned,mortgaged.
Invalid income undefined. Required a positive integer.
Invalid marital status undefined. Required a valid maritalStatus married,single.
Invalid risk questions undefined. Required a valid risk questions [0|1, 0|1, 0|1].
Invalid vehicle undefined. Required a positive integer for year.`;

        expect(() => {
          buildCommand(body);
        }).toThrow(expectedErrorMessage);
      });
    });
  });
});
