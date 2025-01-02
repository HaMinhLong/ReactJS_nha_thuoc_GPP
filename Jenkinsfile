pipeline {
    agent any

    environment {
        RENDER_SERVICE_ID = 'rnd_vnwpzZ2Yx4E9uccKgewx9KP03zhd'   // Thay bằng Render Service ID
    }

    tools {
        nodejs 'NodeJS' // Đây là tên bạn đã cấu hình trong Global Tool Configuration
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/HaMinhLong/ReactJS_nha_thuoc_GPP'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    // Cài đặt dependencies
                    sh 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    // Build ứng dụng React
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy to Vercel') {
            steps {
                script {
                    // Deploy lên Vercel
                    sh 'vercel --token $VERCEL_TOKEN --prod --confirm --project $VERCEL_PROJECT_ID'
                }
            }
        }
    }
}
