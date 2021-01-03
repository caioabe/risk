import request from 'supertest';
import { app } from '../app';

describe('risk controller', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let server: any;
  let agent: request.SuperAgentTest;

  beforeEach(
    () =>
      new Promise<void>((done) => {
        server = app.listen(4000, () => {
          agent = request.agent(server);
          done();
        });
      }),
  );

  afterEach(
    () =>
      new Promise((done) => {
        server.close(done);
      }),
  );

  describe('when posting to /risk/calculate-score', () => {
    describe('when request is valid', () => {
      it('returns 200 with score calculation result', async () => {
        const result = await agent.post('/risk/calculate-score').send({
          age: 35,
          dependents: 0,
          house: { ownershipStatus: 'owned' },
          income: 0,
          maritalStatus: 'married',
          riskQuestions: [0, 0, 0],
          vehicle: { year: 2019 },
        });

        expect(result.status).toBe(200);
        expect(result.body).toMatchObject({
          auto: 'economic',
          home: 'economic',
          life: 'economic',
          disability: 'ineligible',
        });
      });
    });
  });

  describe('when some error occurs', () => {
    it('returns a 422 with error message', async () => {
      const result = await request(app).post('/risk/calculate-score').send();

      expect(result.status).toBe(422);
      expect(result.body.error).toBe(`Calculate Risk Score Command errors:
Invalid age undefined. Required a positive integer.
Invalid dependents undefined. Required a positive integer.
Invalid house undefined. Required a valid ownershipStatus owned,mortgaged.
Invalid income undefined. Required a positive integer.
Invalid marital status undefined. Required a valid maritalStatus married,single.
Invalid risk questions undefined. Required a valid risk questions [0|1, 0|1, 0|1].
Invalid vehicle undefined. Required a positive integer for year.`);
    });
  });
});
