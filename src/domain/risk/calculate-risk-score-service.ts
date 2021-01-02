import { CalculateRiskScoreService } from './types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const calculateRiskScoreService: CalculateRiskScoreService = (dto) => ({
  auto: 'ineligible' as const,
  disability: 'ineligible' as const,
  home: 'ineligible' as const,
  life: 'ineligible' as const,
});
