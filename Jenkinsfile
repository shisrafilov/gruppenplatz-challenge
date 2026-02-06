pipeline {
  agent {
    docker {
      image 'mcr.microsoft.com/playwright:v1.42.0-jammy'
      args '--ipc=host --memory=768m --memory-swap=2g -u root'
    }
  }

  tools {nodejs "nodejs"}

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