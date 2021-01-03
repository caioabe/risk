// TODO

Whilst the first feature remains under development, I decided to use this README.md as a todo list

- [x] Bootstrap backbone (working rest framework + tests + compiling + lint)
- [x] Create basic structure (defining tactical patterns boundaries)
- [x] Command validation
- [-] Risk Domain

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

  - [ ] IncomeNonExistencePolicy
    - [ ] `INELIGIBLE disability`
  - [ ] VehicleNonExistencePolicy
    - [ ] `INELIGIBLE auto`
  - [ ] HouseNonExistencePolicy
    - [ ] `INELIGIBLE home`
  - [ ] IncomeAmountPolicy
    - [ ] `> 200_000 / -1 auto`
    - [ ] `> 200_000 / -1 home`
    - [ ] `> 200_000 / -1 disability`
    - [ ] `> 200_000 / -1 life`
  - [ ] HouseOwnershipPolicy
    - [ ] `mortgaged / +1 home`
    - [ ] `mortgaged / +1 disability`
  - [ ] DependentsExistencePolicy
    - [ ] `+1 disability`
    - [ ] `+1 life`
  - [ ] MariageStatusPolicy
    - [ ] `married / +1 life`
    - [ ] `married / -1 disability`
  - [ ] VehicleAgePolicy
    - [ ] `(now - year) < 5 / +1 auto`

- [ ] API test
- [ ] Readme
