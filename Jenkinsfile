pipeline {
  agent {
    docker {
      image 'mcr.microsoft.com/playwright:v1.58.1-jammy'
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
  }

  post {
    always {
      allure([
        includeProperties: false,
        jdk: '',
        results: [[path: 'allure-results']]
      ])
      cleanWs()
    }
  }
}