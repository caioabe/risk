import NODE_UTIL from 'util';
import {
  CalculateRiskScoreService,
  InsurancesScoreState,
  IssuedApplication,
  RiskScorePolicies,
} from './types';

import { computeBaseScoreService } from './compute-base-score-service';
import { ALL_INSURANCES } from './enums';
import { riskScoreVoFactory } from './compute-policies-engine';

const initialStateFactory = (
  insurances: typeof ALL_INSURANCES,
  baseScore: number,
): InsurancesScoreState => {
  const defaultState = {
    score: baseScore,
    isEligible: true,
  };

  return insurances.reduce(
    (insurancesToProcess, insurance) => ({
      ...insurancesToProcess,
      [insurance]: defaultState,
    }),
    {},
  );
};

const policyRunnerFactory = (monitoringService: {
  // eslint-disable-next-line @typescript-eslint/ban-types
  publish: (msg: string | Object, verbose?: boolean) => void;
}) => (
  policies: RiskScorePolicies,
  issuedApplication: IssuedApplication,
  initialState: InsurancesScoreState,
) => {
  let finalState = initialState;

  policies.forEach((policy) => {
    monitoringService.publish(
      `🛫 ========== COMPUTING POLICY: ${policy.name.toUpperCase()}:`,
    );

    const newState = policy.compute(issuedApplication, finalState);

    monitoringService.publish(
      `FINISHED COMPUTING POLICY: ${policy.name.toUpperCase()}: ✅`,
    );
    monitoringService.publish(newState, true);
    monitoringService.publish(`\n\n\n`);

    finalState = { ...finalState, ...newState };
  });

  return finalState;
};
export const calculateRiskScoreService: CalculateRiskScoreService = ({
  dto,
  policies,
  insurances,
  logger,
}) => {
  const {
    age,
    dependents,
    houseOwnershipStatus,
    income,
    maritalStatus,
    vehicleYear,
    riskQuestions,
  } = dto;

  const issuedApplication = {
    age,
    dependents,
    houseOwnershipStatus,
    income,
    maritalStatus,
    vehicleYear,
    baseScore: computeBaseScoreService({
      riskQuestions,
    }),
  };

  const initialState = initialStateFactory(
    insurances,
    issuedApplication.baseScore,
  );

  // Since this step would need observability due to complex
  // sequential steps, I decided to simulate the interface of a
  // monitoring service that could be injected to allow the runner
  // to send / persist the transition events. Ideally this would be
  // under infra to segregate concerns and respect the inwards flow
  // of Layers Archicteture
  const monitoringService = {
    // eslint-disable-next-line @typescript-eslint/ban-types
    publish: (serializedMessage: string | Object, verbose = false) =>
      verbose
        ? logger.log(NODE_UTIL.inspect(serializedMessage, false, null, true))
        : logger.log(serializedMessage),
  };

  const monitoredPoliciesRunner = policyRunnerFactory(monitoringService);

  return riskScoreVoFactory(
    monitoredPoliciesRunner(policies, issuedApplication, initialState),
  );
};
