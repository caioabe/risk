import { isNumber, isZeroOrOne } from '../number';

describe('number helper', () => {
  describe('when checking if number is 0 or 1', () => {
    describe('when 0 is given', () => {
      it('returns true', () => {
        expect(isZeroOrOne(0)).toBeTruthy();
      });
    });

    describe('when 1 is given', () => {
      it('returns true', () => {
        expect(isZeroOrOne(1)).toBeTruthy();
      });
    });

    describe('when any other value is given', () => {
      it('returns false', () => {
        expect(isZeroOrOne(-1)).toBeFalsy();
        expect(isZeroOrOne(2)).toBeFalsy();
        expect(isZeroOrOne(0.5)).toBeFalsy();
        expect(isZeroOrOne(true)).toBeFalsy();
        expect(isZeroOrOne(false)).toBeFalsy();
        expect(isZeroOrOne({})).toBeFalsy();
        expect(isZeroOrOne([])).toBeFalsy();
        expect(isZeroOrOne(undefined)).toBeFalsy();
        expect(isZeroOrOne(null)).toBeFalsy();
        expect(isZeroOrOne('string')).toBeFalsy();
      });
    });
  });

  describe('when checking if input is a number', () => {
    describe('when a number is given', () => {
      it('returns true', () => {
        expect(isNumber(0)).toBeTruthy();
      });
    });

    describe('when any other value is given', () => {
      it('returns false', () => {
        expect(isNumber(true)).toBeFalsy();
        expect(isNumber(false)).toBeFalsy();
        expect(isNumber({})).toBeFalsy();
        expect(isNumber([])).toBeFalsy();
        expect(isNumber(undefined)).toBeFalsy();
        expect(isNumber(null)).toBeFalsy();
        expect(isNumber('string')).toBeFalsy();
      });
    });
  });
});
