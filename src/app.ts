import express from 'express';

const app = express();
const port = 8080; // default port to listen

app.post('/profile', (_, res) => {
  const dummyData = {};

  res.send(dummyData);
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started at http://localhost:${port}`);
});
