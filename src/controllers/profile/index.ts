import express from 'express';
import {
  calculateProfileApplication,
  CalculateProfileCommand,
} from '../../applications';

// TODO Implement with real functionality
const buildCommand = (req: express.Request): CalculateProfileCommand => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { body } = req;

  return {
    age: 18,
    dependents: 0,
    house: {
      ownershipStatus: 'owned',
    },
    income: 1000,
    maritalStatus: 'married',
    riskQuestions: [true, true, true],
    vehicle: {
      year: 2018,
    },
  };
};

const calculateProfile = (application = calculateProfileApplication) => (
  req: express.Request,
  res: express.Response,
): express.Response => {
  const command = buildCommand(req.body);
  const responseBody = application(command);

  res.send(responseBody);

  return res;
};

export const profileController = { calculateProfile };
