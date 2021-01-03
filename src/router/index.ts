import Router from 'express';
import riskController from '../controllers/risk/calculate-risk-score-controller';

const router = Router();

router.post(
  '/risk/calculate-score',
  riskController.calculateRiskScoreController(),
);

export { router };
