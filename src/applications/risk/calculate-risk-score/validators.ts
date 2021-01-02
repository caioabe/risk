import {
  ALL_MARITAL_STATUSES,
  ALL_OWNERSHIP_STATUSES,
  House,
  MaritalStatusType,
  RiskQuestions,
  Vehicle,
} from '../../../domain/risk';
import { isArray, isZeroOrOne } from '../../../lib';
import { resembles } from '../../command-helpers/resembles';

export const isHouse = (candidate: unknown): candidate is House => {
  if (resembles<House>(candidate)) {
    const isOwnershipStatusValid =
      typeof candidate.ownershipStatus === 'string' &&
      ALL_OWNERSHIP_STATUSES.map((x) => x.toString()).includes(
        candidate.ownershipStatus,
      );

    return isOwnershipStatusValid;
  }

  return false;
};

export const isVehicle = (candidate: unknown): candidate is Vehicle => {
  if (resembles<Vehicle>(candidate)) {
    const isOwnershipStatusValid =
      typeof candidate.year === 'number' && candidate.year > 0;

    return isOwnershipStatusValid;
  }

  return false;
};

export const isMaritalStatus = (
  maritalStatus: unknown,
): maritalStatus is MaritalStatusType =>
  typeof maritalStatus === 'string' &&
  ALL_MARITAL_STATUSES.map((x) => x.toString()).includes(maritalStatus);

export const isRiskQuestions = (
  riskQuestions: unknown,
): riskQuestions is RiskQuestions => {
  if (isArray(riskQuestions)) {
    const filtered = riskQuestions.filter(isZeroOrOne);
    const hasThreeValidElements = filtered.length === 3;

    return hasThreeValidElements;
  }

  return false;
};
