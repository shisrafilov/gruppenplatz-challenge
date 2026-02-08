# gruppenplatz-challenge
## Test automation for gruppenplatz project
### Test framework was built using TypeScript, Playwright and Page Object Model
### [Allure](https://allurereport.org/) is used for test reports

## Setup
```
npm install
npx playwright install
```

## Run tests and gather allure artifacts
```
npm run test:allure
```
## Generate and open allure report locally
```
allure generate
allure open
```

## CI/CD Integration
This project includes a Jenkinsfile for automated test execution

**Pipeline stages:**
1. Install dependencies
2. Run Playwright tests in Docker
3. Generate Allure report
