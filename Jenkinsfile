pipeline {
    agent any

    environment {
        IMAGE = 'priyajit01/nodejs-bluegreen:latest'
        DOCKER = 'C:\\Users\\priya\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe'
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/pb010-temp/nodejs-blue-green.git',
                    credentialsId: 'github-secondary'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Test') {
            steps {
                bat 'npm test'
            }
        }

        stage('Docker Build') {
            steps {
                bat '"%DOCKER%" build -t %IMAGE% .'
            }
        }

        stage('Docker Hub Push') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-bluegreen',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_TOKEN'
                    )
                ]) {
                    bat '"%DOCKER%" login -u %DOCKER_USER% -p %DOCKER_TOKEN%'
                    bat '"%DOCKER%" push %IMAGE%'
                }
            }
        }

        stage('Deploy Green') {
            steps {
                bat '"%DOCKER%" rm --force green 2>NUL'
                bat '"%DOCKER%" run -d --name green --network bluegreen-network -e VERSION=Green %IMAGE%'
            }
        }

        stage('Test Green') {
            steps {
                bat '"%DOCKER%" run --rm --network bluegreen-network curlimages/curl http://green:3000/status'
            }
        }

        stage('Switch Traffic to Green') {
            steps {
                bat 'copy /Y nginx-green.conf "C:\\Users\\priya\\Downloads\\nodejs-ci-cd\\nginx-config\\nginx.conf"'
                bat '"%DOCKER%" exec nginx-router nginx -t'
                bat '"%DOCKER%" exec nginx-router nginx -s reload'
            }
        }
    }
}