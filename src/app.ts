import bodyParser from 'body-parser';
import express from 'express';

import { router } from './router';

const app = express();
const port = 8080;

app.use(bodyParser.json());

app.use(router);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.info(`Server started at http://localhost:${port}`);
});
