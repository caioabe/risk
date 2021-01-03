import moment from 'moment';
import { stateStubFactory } from '../../../../spec/fixtures';
import { vehicleYearPolicy } from '../vehicle-year-policy';

describe('vehicle year policy', () => {
  describe('when getting the policy name', () => {
    it('returns the correct value', () => {
      expect(vehicleYearPolicy.name).toEqual('vehicle-year-policy');
    });
  });

  describe('when insurance is auto', () => {
    describe('when vehicle was produced within the last 5 years', () => {
      it('adds 1 risk point', () => {
        const today = moment();
        const vehicleManufacturingDate = today.subtract(5, 'years');
        const vehicleYear = parseInt(
          vehicleManufacturingDate.format('YYYY'),
          10,
        );

        const result = vehicleYearPolicy.compute(
          {
            age: 18,
            dependents: 0,
            houseOwnershipStatus: 'mortgaged' as const,
            income: 25967,
            maritalStatus: 'single',
            vehicleYear,
            baseScore: 0,
          },
          stateStubFactory('auto' as const),
        );

        expect(result).toEqual({
          auto: {
            isEligible: true,
            score: 1,
          },
        });
      });
    });

    describe('when vehicle was produced more than 5 years ago', () => {
      it('adds 1 risk point', () => {
        const today = moment();
        const vehicleManufacturingDate = today.subtract(6, 'years');
        const vehicleYear = parseInt(
          vehicleManufacturingDate.format('YYYY'),
          10,
        );

        const result = vehicleYearPolicy.compute(
          {
            age: 18,
            dependents: 0,
            houseOwnershipStatus: 'mortgaged' as const,
            income: 25967,
            maritalStatus: 'single',
            vehicleYear,
            baseScore: 0,
          },
          stateStubFactory('auto' as const),
        );

        expect(result).toEqual({
          auto: {
            isEligible: true,
            score: 0,
          },
        });
      });
    });
  });
});
