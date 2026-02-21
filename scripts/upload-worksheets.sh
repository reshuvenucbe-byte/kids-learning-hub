#!/bin/bash

# S3 Upload Script for Worksheets
# Usage: ./upload-worksheets.sh <bucket-name>

BUCKET_NAME=${1:-"kids-learning-worksheets"}
REGION="us-east-1"

echo "Uploading worksheets to S3 bucket: $BUCKET_NAME"

# Create bucket if it doesn't exist
aws s3 mb s3://$BUCKET_NAME --region $REGION 2>/dev/null || echo "Bucket already exists"

# Set bucket policy for public read access (for downloads)
cat > /tmp/bucket-policy.json <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::$BUCKET_NAME/worksheets/*"
    }
  ]
}
EOF

aws s3api put-bucket-policy --bucket $BUCKET_NAME --policy file:///tmp/bucket-policy.json

# Upload worksheets by category
for category in alphabet numbers colors shapes animals words; do
    echo "Uploading $category worksheets..."
    aws s3 sync ./worksheets/$category/ s3://$BUCKET_NAME/worksheets/$category/ \
        --content-type "image/png" \
        --cache-control "max-age=31536000" \
        --acl public-read
done

echo "✅ Upload complete!"
echo "Bucket URL: https://$BUCKET_NAME.s3.$REGION.amazonaws.com"
