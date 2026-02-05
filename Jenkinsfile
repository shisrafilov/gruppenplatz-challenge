pipeline {
  agent any

  tools {nodejs "nodejs"}

  stages {

    stage('Install') {
      steps {
        sh 'npm ci'
        sh 'npx playwright install'
      }
    }

    stage('Run tests') {
      steps {
        sh 'npm run test:allure'
      }
    }

    stage('Generate report') {
      steps {
        sh 'npx allure generate ./allure-results -o ./allure-report --clean'
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'allure-report/**', fingerprint: true
    }
  }
}



