import { Router, Application } from 'express';
import { RiskController } from '../controllers/risk/risk-score-controller';

// eslint-disable-next-line no-underscore-dangle
const _routes: [string, Router][] = [['/risk', RiskController]];

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, controller] = route;

    app.use(url, controller);
  });
};
