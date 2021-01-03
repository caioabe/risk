import express from 'express';
import {
  buildCommand,
  calculateRiskScoreApplication,
} from '../../applications';

const calculateRiskScoreController = (
  application = calculateRiskScoreApplication,
) => (req: express.Request, res: express.Response): express.Response => {
  // Here we could have a try catch to handle errors
  // mapping them to specific http response codes
  // although it might be interesting to create middlewares
  // to abstract away those concerns
  const { body } = req;
  const command = buildCommand(body);

  const responseBody = application()(command);

  res.send(responseBody);

  return res;
};

export default {
  calculateRiskScoreController,
};
