pipeline {
  agent {
    docker {
      image 'mcr.microsoft.com/playwright:v1.58.1-jammy'
      args '--ipc=host --memory=768m --memory-swap=2g -u root'
    }
  }

  tools {nodejs "nodejs"}

  environment {
    CI = 'true'
  }

  stages {

    stage('Install') {
      steps {
        sh '''
          npm config set cache ${WORKSPACE}/.npm-cache --global
          npm config set maxsockets 3
          npm config set fetch-timeout 600000
          npm ci --prefer-offline --no-audit
        '''
      }
    }

    stage('Run tests') {
      steps {
        sh 'npm run test:allure'
      }
    }

    stage('Generate Allure Report') {
      steps {
        sh '''
          rm -f allure-results/testrun.json
          npx allure generate allure-results -o allure-report
          chmod -R 755 allure-report
        '''
      }
    }
  }

  post {
    always {
      publishHTML([
        allowMissing: false,
        alwaysLinkToLastBuild: true,
        keepAll: true,
        reportDir: 'allure-report',
        reportFiles: 'index.html',
        reportName: 'Allure Report',
        reportTitles: 'Allure Test Report'
      ])
      cleanWs()
    }
  }
}