pipeline {
  agent {
    docker {
      image 'mcr.microsoft.com/playwright:v1.42.0-jammy'
      args '--ipc=host'
    }
  }

  tools {nodejs "nodejs"}

  stages {

    stage('Install') {
      steps {
        sh 'npm ci'
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
