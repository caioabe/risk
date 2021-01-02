import {
  CalculateRiskScoreService,
  RiskQuestions,
  RiskScoreStrategy,
} from './types';

const calculateBaseScoreFromRiskQuestions = (
  riskQuestions: RiskQuestions,
): number => riskQuestions.filter((answer) => answer === 1).length;

const autoStrategy: RiskScoreStrategy = () => 'ineligible';
const disabilityStrategy: RiskScoreStrategy = () => 'ineligible';
const homeStrategy: RiskScoreStrategy = () => 'ineligible';
const lifeStrategy: RiskScoreStrategy = () => 'ineligible';

export const calculateRiskScoreService: CalculateRiskScoreService = (dto) => {
  const { riskQuestions } = dto;
  const baseScore = calculateBaseScoreFromRiskQuestions(riskQuestions);

  return {
    auto: autoStrategy(baseScore, dto),
    disability: disabilityStrategy(baseScore, dto),
    home: homeStrategy(baseScore, dto),
    life: lifeStrategy(baseScore, dto),
  };
};
