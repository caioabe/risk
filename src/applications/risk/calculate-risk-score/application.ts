import { CalculateRiskScoreApplication } from './types';
import { logger as defaultLogger } from '../../../infra';
import {
  ALL_INSURANCES,
  calculateRiskScoreService as calculateRiskScore,
} from '../../../domain/risk';
import { activePolicies } from '../../../domain/risk/policies/active-policies';

const defaultDependencies = {
  logger: defaultLogger,
  calculateRiskScoreService: calculateRiskScore,
};

const calculateRiskScoreApplication: CalculateRiskScoreApplication = ({
  calculateRiskScoreService,
  logger,
} = defaultDependencies) => (command) => {
  const {
    age,
    dependents,
    house,
    income,
    maritalStatus,
    riskQuestions,
    vehicle,
  } = command;
  try {
    const houseOwnershipStatus = house?.ownershipStatus ?? null;
    const vehicleYear = vehicle?.year ?? null;
    const dto = {
      age,
      dependents,
      houseOwnershipStatus,
      income,
      maritalStatus,
      riskQuestions,
      vehicleYear,
    };

    // I'd not log those, but I'll use them to explain the flow
    // more easily
    console.log(
      '######################## BEGIN OF SCRIPT ########################\n\n',
    );
    console.log('DTO:', dto);
    console.log(
      'ACTIVE POLICIES:',
      activePolicies.map((p: { name: unknown }) => p.name),
    );
    console.log('INSURANCES:', ALL_INSURANCES);

    const result = calculateRiskScoreService({
      dto,
      policies: activePolicies,
      insurances: ALL_INSURANCES,
      logger,
    });

    console.log(result);
    console.log(
      '######################## END OF SCRIPT ########################\n\n',
    );

    return result;
  } catch (error) {
    const message = `Calculate Risk Score Application: Unexpected error when trying to calculate risk score${error.message}`;

    logger.log(message);

    throw Error(message);
  }
};

export { calculateRiskScoreApplication };
