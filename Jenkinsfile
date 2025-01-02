pipeline {
    agent any

     environment {
        VERCEL_TOKEN = credentials('vercel-token') // Lưu token Vercel trong Jenkins Credentials
        VERCEL_PROJECT_ID = 'prj_D4cq0iNPv1AWSxNkQMueCQNcAfjO' // ID của dự án trên Vercel
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
