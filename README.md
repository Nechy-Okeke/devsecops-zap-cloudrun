# DevSecOps Project with OWASP ZAP, GitLab, and AWS App Runner

This project demonstrates a full DevSecOps pipeline:
1.  **Build:** Node.js application is containerized using Docker.
2.  **Deploy (IaC):** AWS infrastructure (ECR, App Runner) is provisioned using CloudFormation.
3.  **Scan (DAST):** OWASP ZAP performs a dynamic scan on the live AWS App Runner service URL.
4.  **Report:** ZAP results are generated and stored as pipeline artifacts.
##