import express from 'express';
import {
  buildCommand,
  calculateRiskScoreApplication,
} from '../../applications';

const calculateRiskScore = (application = calculateRiskScoreApplication) => (
  req: express.Request,
  res: express.Response,
): express.Response => {
  const { body } = req;
  const command = buildCommand(body);

  const responseBody = application()(command);

  res.send(responseBody);

  return res;
};

export const riskController = { calculateRiskScore };
