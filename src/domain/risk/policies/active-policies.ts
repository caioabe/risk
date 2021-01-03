import { agePolicy } from './age-policy';
import { houseNonExistencePolicy } from './house-non-existence-policy';
import { incomeAmountPolicy } from './income-amount-policy';
import { incomeNonExistencePolicy } from './income-non-existence-policy';
import { vehicleNonExistencePolicy } from './vehicle-non-existence-policy';
import { houseOwnershipPolicy } from './house-ownership-policy';
import { dependentsExistencePolicy } from './dependents-existence-policy';
import { maritalStatusPolicy } from './marital-status-policy';

export const activePolicies = [
  agePolicy,
  incomeNonExistencePolicy,
  vehicleNonExistencePolicy,
  houseNonExistencePolicy,
  incomeAmountPolicy,
  houseOwnershipPolicy,
  dependentsExistencePolicy,
  maritalStatusPolicy,
];
