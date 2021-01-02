import { CalculateRiskScoreApplication } from './types';
import { logger as defaultLogger } from '../../../infra';
import { calculateRiskScoreService as calculateRiskScore } from '../../../domain/risk';

const defaultDependencies = {
  calculateRiskScoreService: calculateRiskScore,
  logger: defaultLogger,
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
    return calculateRiskScoreService({
      age,
      dependents,
      houseOwnershipStatus,
      income,
      maritalStatus,
      riskQuestions,
      vehicleYear,
    });
  } catch (error) {
    const message = `Calculate Risck Score Application: Unexpected error when trying to calculate risk score${error.message}`;

    logger.publish(message);

    throw Error(message);
  }
};

export { calculateRiskScoreApplication };
