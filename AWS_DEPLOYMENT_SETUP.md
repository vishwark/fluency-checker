# AWS S3 Deployment Setup Guide

This guide will help you set up AWS credentials and configure your GitHub repository to deploy to AWS S3.

## Prerequisites

- AWS Account
- GitHub Repository with Admin access
- Basic understanding of AWS IAM and S3

## Step 1: Create an AWS IAM User

1. Go to [AWS IAM Console](https://console.aws.amazon.com/iam/)
2. Click on **Users** in the left sidebar
3. Click **Create user**
4. Enter a username (e.g., `github-actions-s3-deploy`)
5. Click **Next**
6. Click **Attach policies directly**
7. Search for and select the following policies:
   - `AmazonS3FullAccess` (or create a custom policy with S3 permissions)
   - `CloudFrontFullAccess` (optional, only if using CloudFront)
8. Click **Next** and then **Create user**

## Step 2: Generate Access Keys

1. In the IAM Console, click on the user you just created
2. Go to the **Security credentials** tab
3. Scroll down to **Access keys** section
4. Click **Create access key**
5. Select **Application running outside AWS** as the use case
6. Click **Next**
7. (Optional) Add a description like "GitHub Actions S3 Deployment"
8. Click **Create access key**
9. **Important**: Copy and save both the **Access Key ID** and **Secret Access Key** - you won't be able to see the secret key again!

## Step 3: Create/Configure S3 Bucket

1. Go to [AWS S3 Console](https://console.aws.amazon.com/s3/)
2. Click **Create bucket** (or use an existing bucket)
3. Enter a bucket name (e.g., `my-fluency-checker-app`)
4. Choose your preferred region
5. Click **Create bucket**

### Configure Bucket for Web Hosting (Optional)

1. Select your bucket
2. Go to **Properties** tab
3. Scroll to **Static website hosting**
4. Click **Edit**
5. Enable **Static website hosting**
6. Set **Index document** to `index.html`
7. Set **Error document** to `404.html`
8. Click **Save changes**

### Configure Bucket Policy (Optional but Recommended)

1. Go to **Permissions** tab
2. Click **Edit** under **Bucket policy**
3. Add the following policy to make objects publicly readable:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
    }
  ]
}
```

Replace `YOUR_BUCKET_NAME` with your actual bucket name.

## Step 4: Add Secrets to GitHub

1. Go to your GitHub repository
2. Click **Settings** (top right)
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Add the following secrets:

### Required Secrets:

| Secret Name | Value |
|---|---|
| `AWS_ACCESS_KEY_ID` | Your AWS Access Key ID from Step 2 |
| `AWS_SECRET_ACCESS_KEY` | Your AWS Secret Access Key from Step 2 |
| `AWS_REGION` | Your AWS region (e.g., `us-east-1`, `ap-south-1`) |
| `AWS_S3_BUCKET_NAME` | Your S3 bucket name from Step 3 |

### Optional Variables:

If you're using CloudFront for CDN:

1. Click **New repository variable** (not secret)
2. Add:

| Variable Name | Value |
|---|---|
| `AWS_CLOUDFRONT_DISTRIBUTION_ID` | Your CloudFront Distribution ID |

To find your CloudFront Distribution ID:
- Go to [CloudFront Console](https://console.aws.amazon.com/cloudfront/)
- Find your distribution and copy the **Distribution ID**

## Step 5: Create the aws-deploy-branch

1. In your local repository, create a new branch:
   ```bash
   git checkout -b aws-deploy-branch
   ```

2. Make your changes and push:
   ```bash
   git push origin aws-deploy-branch
   ```

3. The GitHub Actions workflow will automatically trigger and deploy to S3

## Step 6: Monitor Deployment

1. Go to your GitHub repository
2. Click **Actions** tab
3. You should see the "Deploy to AWS S3" workflow running
4. Click on it to see detailed logs

## Troubleshooting

### Access Denied Error
- Verify the IAM user has `AmazonS3FullAccess` policy attached
- Check that the Access Key ID and Secret Access Key are correct
- Ensure the secrets are properly set in GitHub

### Bucket Not Found Error
- Verify the bucket name is correct in the `AWS_S3_BUCKET_NAME` secret
- Ensure the bucket exists in the specified AWS region

### CloudFront Invalidation Fails
- Verify the Distribution ID is correct
- Ensure the IAM user has `CloudFrontFullAccess` policy
- This step is optional and won't block the deployment

## Security Best Practices

1. **Rotate Access Keys Regularly**: Generate new access keys periodically and delete old ones
2. **Use IAM Policies**: Restrict the IAM user to only S3 and CloudFront permissions
3. **Enable MFA**: Add Multi-Factor Authentication to your AWS account
4. **Monitor Access**: Check CloudTrail logs for unauthorized access attempts
5. **Never Commit Secrets**: Never hardcode AWS credentials in your repository

## Additional Resources

- [AWS IAM Documentation](https://docs.aws.amazon.com/iam/)
- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions)
- [AWS CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)
