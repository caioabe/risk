# Risk

- This component focuses on risk score calculation
- The domain risk is concerned about tackling problems related to insurance risk analysis
- Before expanding the domain concerns, ping #my-team to discuss about our microservices strategies and CCP compliance

# Main ADRs

- I've put some comments on top of the most important functions
- Except for monitoringServices and loggers, all `console.log's` where intentionally written for demonstration purposes

@caioabe

# Setup and Run

```bash
# node version 15
npm install -g yarn
```

```bash
yarn && yarn start
```

# Testing

```bash
# curl example to 8080
curl -X POST -d '{ "age": 35, "dependents": 0, "house": {  "ownershipStatus": "owned" }, "income": 0, "maritalStatus": "married", "riskQuestions": [0,0,0], "vehicle": {  "year": 2019 } }' http://localhost:8080/risk/calculate-score -H 'Content-Type: application/json'
# expected response:
# {"auto":"economic", "home":"economic", "life":"economic", "disability":"ineligible"}
```

// TODO

Whilst the first feature remains under development, I decided to use this README.md as a todo list

- [x] Bootstrap backbone (working rest framework + tests + compiling + lint)
- [x] Create basic structure (defining tactical patterns boundaries)
- [x] Command validation
- [ ] Risk Domain

  - [x] Risk Questions Computation

    - [x] Reduce positive answers

  - [x] AgePolicy
    - [x] `> 60 / INELIGIBLE disability`
    - [x] `> 60 / INELIGIBLE life`
    - [x] `< 30 / -2 auto`
    - [x] `< 30 / -2 home`
    - [x] `< 30 / -2 disability`
    - [x] `< 30 / -2 life`
    - [x] `>= 30 && <= 40 / -1 auto`
    - [x] `>= 30 && <= 40 / -1 home`
    - [x] `>= 30 && <= 40 / -1 disability`
    - [x] `>= 30 && <= 40 / -1 life`
  - [x] Map scores to human readable output
  - [x] Create engine for configurable chain of policies computation

  - [x] IncomeNonExistencePolicy
    - [x] `INELIGIBLE disability`
  - [x] VehicleNonExistencePolicy
    - [x] `INELIGIBLE auto`
  - [x] HouseNonExistencePolicy
    - [x] `INELIGIBLE home`
  - [x] IncomeAmountPolicy
    - [x] `> 200_000 / -1 auto`
    - [x] `> 200_000 / -1 home`
    - [x] `> 200_000 / -1 disability`
    - [x] `> 200_000 / -1 life`
  - [x] HouseOwnershipPolicy
    - [x] `mortgaged / +1 home`
    - [x] `mortgaged / +1 disability`
  - [x] DependentsExistencePolicy
    - [x] `+1 disability`
    - [x] `+1 life`
  - [x] MariageStatusPolicy
    - [x] `married / +1 life`
    - [x] `married / -1 disability`
  - [ ] VehicleAgePolicy (use moment js)
    - [ ] `(now - year) < 5 / +1 auto`

- [ ] API test
- [x] Readme
