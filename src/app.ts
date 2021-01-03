import express, { Application } from 'express';
import { routes } from './routes';

const port = 8080;

export const app: Application = express();

routes(app);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.info(`Server started at http://localhost:${port}`);
});
