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
                    npm run build
                    ls -la
                '''
            }
        }
        stage("Test") {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                echo "Hello from Second Stage"
                sh '''
                    npm test app.controller.spec.ts
                '''
            }
        }
        stage("Print1") {
            steps {
                echo "Hello from Print1"
            }
        }
        stage("Print2") {
            steps {
                echo "Hello from Print2"
            }
        }
        stage("Parallel Stages") {
            parallel {
                stage("Print1") {
                    steps {
                        echo "Hello from Parallel Print1"
                    }
                }
                stage("Print2") {
                    steps {
                        echo "Hello from Parallel Print2"
                    }
                }
            }
        }
    }
}
