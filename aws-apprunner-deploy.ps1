# PowerShell script to deploy AWS App Runner service directly using AWS CLI

# Variables - update these as needed
$SERVICE_NAME = "devsecops-zap-app"
$ECR_IMAGE_URI = "879381264902.dkr.ecr.us-east-1.amazonaws.com/devsecops-zap-app-repo:cd7c382740dc6acde100cf7d78f1e1819addf907"
$AWS_REGION = "us-east-1"
$CPU = "1024"  # 1 vCPU
$MEMORY = "2048"  # 2 GB
$PORT = "8080"
$HEALTH_CHECK_PATH = "/health"
$ACCESS_ROLE_ARN = "arn:aws:iam::879381264902:role/devsecops-AppRunnerAccessRole"

# Create App Runner service
aws apprunner create-service `
  --service-name $SERVICE_NAME `
  --source-configuration ImageRepository={ImageIdentifier=$ECR_IMAGE_URI,ImageRepositoryType=ECR,ImageConfiguration={Port=$PORT,RuntimeEnvironmentVariables=[{Name=NODE_ENV,Value=production}]}},AuthenticationConfiguration={AccessRoleArn=$ACCESS_ROLE_ARN} `
  --instance-configuration Cpu=$CPU,Memory=$MEMORY `
  --health-check-configuration Path=$HEALTH_CHECK_PATH,Protocol=HTTP `
  --region $AWS_REGION

Write-Host "App Runner service creation initiated. Monitor the service status in AWS Console."
