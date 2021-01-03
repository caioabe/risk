import {
  issuedApplicationStubFactory,
  stateStubFactory,
} from '../../../../spec/fixtures';
import { agePolicy } from '../age-policy';

/*
  It would be possible to make these tests less granular
  Eg.: By merging some assertions, grouped by insurance type or age

  However I decided to code them separately since the cost of creating
  new ones is reasonable given the pros of segregating different
  business interests thus avoiding unwanted side-effects between products
*/

const UNDER_THIRTY = 29;
const BETWEEN_30_I_AND_40_NI = 39;
const ABOVE_SIXTY = 61;

describe('age policy', () => {
  describe('when getting the policy name', () => {
    it('returns the correct value', () => {
      expect(agePolicy.name).toEqual('age-policy');
    });
  });

  describe('when insurance is auto', () => {
    describe('when age is under 30', () => {
      it('deducts 2 score points', () => {
        const result = agePolicy.compute(
          issuedApplicationStubFactory({ age: UNDER_THIRTY }),
          stateStubFactory(),
        );

        expect(result).toEqual({
          auto: {
            isEligible: true,
            score: -2,
          },
        });
      });
    });

    describe('when age is between 30 inclusive and 40 not inclusive', () => {
      it('deducts 1 score points', () => {
        const result = agePolicy.compute(
          issuedApplicationStubFactory({ age: BETWEEN_30_I_AND_40_NI }),
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
    describe('when age is under 30', () => {
      it('deducts 2 score points', () => {
        const result = agePolicy.compute(
          issuedApplicationStubFactory({ age: UNDER_THIRTY }),
          stateStubFactory('home' as const),
        );

        expect(result).toEqual({
          home: {
            isEligible: true,
            score: -2,
          },
        });
      });
    });

    describe('when age is between 30 inclusive and 40 not inclusive', () => {
      it('deducts 1 score points', () => {
        const result = agePolicy.compute(
          issuedApplicationStubFactory({ age: BETWEEN_30_I_AND_40_NI }),
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
    describe('when age is under 30', () => {
      it('deducts 2 score points', () => {
        const result = agePolicy.compute(
          issuedApplicationStubFactory({ age: UNDER_THIRTY }),
          stateStubFactory('disability' as const),
        );

        expect(result).toEqual({
          disability: {
            isEligible: true,
            score: -2,
          },
        });
      });
    });

    describe('when age is between 30 inclusive and 40 not inclusive', () => {
      it('deducts 1 score points', () => {
        const result = agePolicy.compute(
          issuedApplicationStubFactory({ age: BETWEEN_30_I_AND_40_NI }),
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

    describe('when age is above 60', () => {
      it('revokes eligibility', () => {
        const result = agePolicy.compute(
          issuedApplicationStubFactory({ age: ABOVE_SIXTY }),
          stateStubFactory('disability' as const),
        );

        expect(result).toEqual({
          disability: {
            isEligible: false,
            score: 0,
          },
        });
      });
    });
  });

  describe('when insurance is life', () => {
    describe('when age is under 30', () => {
      it('deducts 2 score points', () => {
        const result = agePolicy.compute(
          issuedApplicationStubFactory({ age: UNDER_THIRTY }),
          stateStubFactory('life' as const),
        );

        expect(result).toEqual({
          life: {
            isEligible: true,
            score: -2,
          },
        });
      });
    });

    describe('when age is between 30 inclusive and 40 not inclusive', () => {
      it('deducts 1 score points', () => {
        const result = agePolicy.compute(
          issuedApplicationStubFactory({ age: BETWEEN_30_I_AND_40_NI }),
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

    describe('when age is above 60', () => {
      it('revokes eligibility', () => {
        const result = agePolicy.compute(
          issuedApplicationStubFactory({ age: ABOVE_SIXTY }),
          stateStubFactory('life' as const),
        );

        expect(result).toEqual({
          life: {
            isEligible: false,
            score: 0,
          },
        });
      });
    });
  });
});
