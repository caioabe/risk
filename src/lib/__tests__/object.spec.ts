import { isArray } from '../object';

describe('object helper', () => {
  describe('when checking if input is an array', () => {
    describe('when an array is given', () => {
      it('returns true', () => {
        expect(isArray([])).toBeTruthy();
      });
    });

    describe('when any other value is given', () => {
      it('returns false', () => {
        expect(isArray(0)).toBeFalsy();
        expect(isArray(true)).toBeFalsy();
        expect(isArray(false)).toBeFalsy();
        expect(isArray({})).toBeFalsy();
        expect(isArray(undefined)).toBeFalsy();
        expect(isArray(null)).toBeFalsy();
        expect(isArray('string')).toBeFalsy();
      });
    });
  });
});
