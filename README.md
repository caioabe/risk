# Risk

- This component focuses on risk score calculation
- The domain risk is concerned about tackling problems related to insurance risk analysis
- Before expanding the domain concerns, ping #my-team to discuss about our microservices strategies and CCP compliance

# Main ADRs and Debugging
![Architecture Decision Record](https://github.com/caioabe/risk/blob/main/adr.jpg?raw=true)

- I chose Typescript for the solution due to my fluency in JS and the desire to enjoy learning more abore TS :)
- I'd really like to code this in Python to be more compliant with Origin's stack but I have to be honest in admitting that it would be impractical the assignment's due date added to all the things I'd like to exercise here
- Since this component seems to be stateless in nature (until new requirements arise), it does not have repositories, mutable entities (only immutable VOs), transactional boundaries or any other persistence related tactical patterns applied
- I've put some comments on top of the most important functions
- I've put some logs to help the understanding of the state flow (only for challenge assessing purposes)

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
