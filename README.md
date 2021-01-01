// TODO

Whilst the first feature remains under development, I decided to use this README.md as a todo list

- [x] Bootstrap backbone (working rest framework + tests + compiling + lint)
- [x] Create basic structure (defining tactical patterns boundaries)
- [ ] Command validation
- [ ] Profile Domain

  - [ ] Calculate Base Score (reduce summing Truthy values)
  - [ ] Calculate Risk Score:

    - [ ] If the user doesn’t have income, vehicles or houses, she is ineligible for disability, auto, and home insurance, respectively.
    - [ ] If the user is over 60 years old, she is ineligible for disability and life insurance.
    - [ ] If the user is under 30 years old, deduct 2 risk points from all lines of insurance. If she is between 30 and 40 years old, deduct 1.
    - [ ] If her income is above $200k, deduct 1 risk point from all lines of insurance.
    - [ ] If the user's house is mortgaged, add 1 risk point to her home score and add 1 risk point to her disability score.
    - [ ] If the user has dependents, add 1 risk point to both the disability and life scores.
    - [ ] If the user is married, add 1 risk point to the life score and remove 1 risk point from disability.
    - [ ] If the user's vehicle was produced in the last 5 years, add 1 risk point to that vehicle’s score.

  - [ ] Map scores to human readable output

- [ ] API test
- [ ] Readme
