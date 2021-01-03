import { ComputeBaseScoreService } from './types';

// Suggestion: Needs discussion:
// I extracted this to be exemplary for next iterations
// since this has a smell of possibly getting more complex in future
// and being used by other services as well
export const computeBaseScoreService: ComputeBaseScoreService = ({
  riskQuestions,
}) => riskQuestions.filter((answer) => answer === 1).length;
