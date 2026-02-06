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

    stage('Run tests in Docker') {
      agent {
        docker {
          image 'mcr.microsoft.com/playwright:v1.58.1-jammy'
          args '--ipc=host -v ${WORKSPACE}:/workspace -w /workspace -u root'
          reuseNode true
        }
      }
      steps {
        sh '''
          npm config set cache /workspace/.npm-cache
          npm ci --prefer-offline --no-audit
          npm run test:allure
          chmod -R 777 allure-results
        '''
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