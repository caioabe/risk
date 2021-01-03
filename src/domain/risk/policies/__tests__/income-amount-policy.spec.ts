import {
  issuedApplicationStubFactory,
  stateStubFactory,
} from '../../../../spec/fixtures';
import { incomeAmountPolicy } from '../income-amount-policy';

describe('income amount policy', () => {
  describe('when getting the policy name', () => {
    it('returns the correct value', () => {
      expect(incomeAmountPolicy.name).toEqual('income-amount-policy');
    });
  });

  describe('when insurance is auto', () => {
    describe('when income is less than 200_000', () => {
      it('deducts 1 score points', () => {
        const result = incomeAmountPolicy.compute(
          issuedApplicationStubFactory({ income: 1 }),
          stateStubFactory(),
        );

        expect(result).toEqual({
          auto: {
            isEligible: true,
            score: -1,
          },
        });
      });
    });
  });

  describe('when insurance is home', () => {
    describe('when income is less than 200_000', () => {
      it('deducts 1 score points', () => {
        const result = incomeAmountPolicy.compute(
          issuedApplicationStubFactory({ income: 1 }),
          stateStubFactory('home' as const),
        );

        expect(result).toEqual({
          home: {
            isEligible: true,
            score: -1,
          },
        });
      });
    });
  });

  describe('when insurance is disability', () => {
    describe('when income is less than 200_000', () => {
      it('deducts 1 score points', () => {
        const result = incomeAmountPolicy.compute(
          issuedApplicationStubFactory({ income: 1 }),
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

  describe('when insurance is life', () => {
    describe('when income is less than 200_000', () => {
      it('deducts 1 score points', () => {
        const result = incomeAmountPolicy.compute(
          issuedApplicationStubFactory({ income: 1 }),
          stateStubFactory('life' as const),
        );

        expect(result).toEqual({
          life: {
            isEligible: true,
            score: -1,
          },
        });
      });
    });
  });
});
