// Ideally I'd test this component like in an integration test
// mocking (not necessarily stubbing) the external calls - since we could have
// contract testing depending on the complexity of the business - to focus
// on the orchestration of the service and spying on more stable
// internal impure services like monitoring services for example.

// For the sake of simplicity, I decided to
// skip this one, since the application test will cover
// the "Does it work?" test

// Ps.: Not sure if expensive tests like smoke or E2E are required
// I believe it would need deeper analysis on business requirements

describe('when skipping', () => {
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('it skips', () => {
    expect(1).toBeTruthy();
  });
});

// eslint-disable-next-line jest/no-export
export {};
