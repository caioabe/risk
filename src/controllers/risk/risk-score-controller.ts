import bodyParser from 'body-parser';
import { Request, Response, Router } from 'express';
import {
  buildCommand,
  calculateRiskScoreApplication,
} from '../../applications';

export const RiskController: Router = Router();

const jsonParser = bodyParser.json();

RiskController.post(
  '/calculate-score',
  jsonParser,
  async (req: Request, res: Response) => {
    try {
      const { body } = req;

      const command = buildCommand(body);

      const responseBody = calculateRiskScoreApplication()(command);

      res.status(200).send(responseBody);
    } catch (error) {
      res.status(422).send({ error: error.message });
    }
  },
);
