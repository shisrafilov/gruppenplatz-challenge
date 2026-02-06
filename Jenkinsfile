pipeline {
  agent any

  tools {
    nodejs "nodejs"
    allure 'allure'
  }

  stages {

    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install') {
      steps {
        sh '''
          npm config set cache ${WORKSPACE}/.npm-cache
          npm config set maxsockets 3
          npm config set fetch-timeout 600000
          npm ci --prefer-offline --no-audit
        '''
      }
    }

    stage('Install Playwright') {
      steps {
        sh 'npx playwright install --with-deps chromium'
      }
    }

    stage('Run tests') {
      steps {
        sh 'npm run test:allure'
      }
    }
  }

  post {
    always {
      allure([
        includeProperties: false,
        jdk: '',
        results: [[path: 'allure-results']]
      ])
    }
  }
}