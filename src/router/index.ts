import Router from 'express';
import { riskController } from '../controllers';

const router = Router();

router.post('/risk/calculate-score', riskController.calculateRiskScore());

export { router };
