# Deployment Guide

## AWS Account Configuration

This project uses AWS Account: `104071297930`

### S3 Bucket
- Bucket Name: `kids-learning-worksheets-104071297930`
- Region: `us-east-1`
- Purpose: Stores worksheet images

## Local Development Setup

1. Copy environment variables:
```bash
cp .env.example .env.local
```

2. Update `.env.local` with your bucket URL:
```
NEXT_PUBLIC_S3_BUCKET_URL=https://kids-learning-worksheets-104071297930.s3.us-east-1.amazonaws.com
```

3. Configure AWS credentials:
```bash
aws configure
```

4. Generate and upload worksheets:
```bash
cd scripts
npm install
node generate-and-upload.js
```

## Production Deployment

### Option 1: Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_S3_BUCKET_URL`
   - `AWS_ACCESS_KEY_ID` (if needed)
   - `AWS_SECRET_ACCESS_KEY` (if needed)

### Option 2: AWS Amplify

1. Connect your GitHub repository
2. Set environment variables in Amplify console
3. Deploy automatically on push

### Option 3: Self-hosted

1. Build the project:
```bash
npm run build
```

2. Start production server:
```bash
npm start
```

## Environment Variables

- `NEXT_PUBLIC_S3_BUCKET_URL`: Public S3 bucket URL (required)
- `S3_BUCKET_NAME`: Bucket name for scripts (optional, defaults to hardcoded value)
- `AWS_REGION`: AWS region (optional, defaults to us-east-1)
- `AWS_ACCESS_KEY_ID`: AWS credentials (use IAM roles in production)
- `AWS_SECRET_ACCESS_KEY`: AWS credentials (use IAM roles in production)

## Security Notes

- Never commit `.env.local` or `.env.production` files
- Use IAM roles instead of access keys in production
- Keep S3 bucket private and use signed URLs for access
- Regularly rotate AWS credentials
