pipeline {
    agent any

    environment {
        RENDER_API_KEY = credentials('render-api-key') // Thêm Render API Key trong Jenkins
        RENDER_SERVICE_ID = 'rnd_vnwpzZ2Yx4E9uccKgewx9KP03zhd'   // Thay bằng Render Service ID
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Lấy mã nguồn từ GitHub
                git branch: 'main', url: 'https://github.com/HaMinhLong/ReactJS_nha_thuoc_GPP'
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
                    // Sử dụng Render CLI để deploy
                    sh """
                    render deploy --service-id ${RENDER_SERVICE_ID} --api-key ${RENDER_API_KEY}
                    """
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
