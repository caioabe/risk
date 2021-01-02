import express from 'express';
import { buildCommand, calculateProfileApplication } from '../../applications';

const calculateProfile = (application = calculateProfileApplication) => (
  req: express.Request,
  res: express.Response,
): express.Response => {
  const { body } = req;
  const command = buildCommand(body);

  const responseBody = application(command);

  res.send(responseBody);

  return res;
};

export const profileController = { calculateProfile };
