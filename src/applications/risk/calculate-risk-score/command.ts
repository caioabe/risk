import {
  ALL_MARITAL_STATUSES,
  ALL_OWNERSHIP_STATUSES,
  House,
  MaritalStatusType,
  RiskQuestions,
  Vehicle,
} from '../../../domain/risk';
import { isNumber } from '../../../lib';
import { checkValid } from '../../command-helpers';
import { CalculateRiskScoreCommand, RequestBody } from './types';

import {
  isHouse,
  isVehicle,
  isMaritalStatus,
  isRiskQuestions,
} from './validators';

const validatePositiveNumber = (key: string, value: unknown) => ():
  | number
  | never => {
  if (isNumber(value) && value >= 0) {
    return value;
  }

  throw Error(`Invalid ${key} ${value}. Required a positive integer.`);
};

const validateHouse = (house: unknown) => () => {
  if (house === null) return house;

  return checkValid(isHouse)<House>({
    candidate: house,
    errorMessage: `Invalid house ${JSON.stringify(
      house,
    )}. Required a valid ownershipStatus ${ALL_OWNERSHIP_STATUSES}.`,
  });
};

const validateVehicle = (vehicle: unknown) => () => {
  if (vehicle === null) return vehicle;

  return checkValid(isVehicle)<Vehicle>({
    candidate: vehicle,
    errorMessage: `Invalid vehicle ${JSON.stringify(
      vehicle,
    )}. Required a positive integer for year.`,
  });
};

const validateMaritalStatus = (maritalStatus: unknown) => () =>
  checkValid(isMaritalStatus)<MaritalStatusType>({
    candidate: maritalStatus,
    errorMessage: `Invalid marital status ${JSON.stringify(
      maritalStatus,
    )}. Required a valid maritalStatus ${ALL_MARITAL_STATUSES}.`,
  });

const validateRiskQuestions = (riskQuestions: unknown) => () =>
  checkValid(isRiskQuestions)<RiskQuestions>({
    candidate: riskQuestions,
    errorMessage: `Invalid risk questions ${JSON.stringify(
      riskQuestions,
    )}. Required a valid risk questions [0|1, 0|1, 0|1].`,
  });

export const buildCommand = ({
  age,
  dependents,
  house,
  income,
  maritalStatus,
  riskQuestions,
  vehicle,
}: RequestBody): CalculateRiskScoreCommand => {
  const validations = [
    validatePositiveNumber('age', age),
    validatePositiveNumber('dependents', dependents),
    validateHouse(house),
    validatePositiveNumber('income', income),
    validateMaritalStatus(maritalStatus),
    validateRiskQuestions(riskQuestions),
    validateVehicle(vehicle),
  ];

  const errors = validations.reduce((acc, cur) => {
    try {
      cur();
    } catch (error) {
      return [...acc, error.message];
    }

    return acc;
  }, [] as string[]);

  if (errors.length > 0) {
    const mergedErrors = errors.reduce((acc, cur) => `${acc}\n${cur}`, '');
    const errorMessage = `Calculate Risk Score Command errors:${mergedErrors}`;

    throw Error(errorMessage);
  }

  return {
    age,
    dependents,
    house: house as House,
    income,
    maritalStatus: maritalStatus as MaritalStatusType,
    riskQuestions: riskQuestions as RiskQuestions,
    vehicle,
  };
};
