pipeline {
    agent any

    environment {
        RENDER_SERVICE_ID = 'rnd_vnwpzZ2Yx4E9uccKgewx9KP03zhd'   // Thay bằng Render Service ID
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Lấy mã nguồn từ GitHub
                git branch: 'main', url: 'https://github.com/HaMinhLong/ReactJS_nha_thuoc_GPP.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    // Cài đặt các package cần thiết
                    sh 'npm install'
                }
            }
        }

        stage('Build App') {
            steps {
                script {
                    // Build ứng dụng ReactJS
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy to Render') {
            steps {
                script {
                    // Sử dụng withCredentials để truyền API Key an toàn vào môi trường
                    withCredentials([string(credentialsId: 'render-api-key', variable: 'RENDER_API_KEY')]) {
                        // Deploy lên Render
                        sh """
                        render deploy --service-id ${RENDER_SERVICE_ID} --api-key ${RENDER_API_KEY}
                        """
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Build and Deployment Successful!'
        }
        failure {
            echo 'Build or Deployment Failed!'
        }
    }
}
