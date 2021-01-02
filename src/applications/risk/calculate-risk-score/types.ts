import {
  CalculateRiskScoreService,
  House,
  MaritalStatusType,
  RiskQuestions,
  RiskScoreVO,
  Vehicle,
} from '../../../domain/risk';
import { Logger } from '../../../infra';

export interface CalculateRiskScoreCommand {
  age: number;
  dependents: number;
  house: House | null;
  income: number;
  maritalStatus: MaritalStatusType;
  riskQuestions: RiskQuestions;
  vehicle: Vehicle | null;
}

export interface RequestBody {
  age: number;
  dependents: number;
  house: {
    ownershipStatus: string;
  } | null;
  income: number;
  maritalStatus: string;
  riskQuestions: number[];
  vehicle: {
    year: number;
  } | null;
}

export type CalculateRiskScoreApplication = ({
  calculateRiskScoreService,
  logger,
}: {
  calculateRiskScoreService: CalculateRiskScoreService;
  logger: Logger;
}) => (command: CalculateRiskScoreCommand) => RiskScoreVO;
