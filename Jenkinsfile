pipeline {
    agent any

    stages {
        stage('Hello') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                echo 'Hello World'
                sh '''
                ls -la
                    node --version
                    npm --version
                    npm ci 
                    num run build
                    ls -la
                '''
            }
        }
    }
}
