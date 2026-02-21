# Worksheet Generation & Upload Guide

## Step 1: Generate High-Quality Worksheets

1. Open `scripts/generate-worksheets.html` in your browser
2. Click each button to generate worksheets:
   - **Alphabet** (200 worksheets) - Proper 4-line ruled paper with uppercase/lowercase
   - **Numbers** (200 worksheets) - With counting dots and practice lines
   - **Colors** (150 worksheets) - Color swatches with name practice
   - **Shapes** (150 worksheets) - Shape drawings with name practice
   - **Animals** (200 worksheets) - Animal names with practice lines
   - **Words** (200 worksheets) - Simple 3-letter words with tracing

3. Worksheets will download automatically to your Downloads folder
4. Organize them into folders:
   ```
   worksheets/
   ├── alphabet/
   ├── numbers/
   ├── colors/
   ├── shapes/
   ├── animals/
   └── words/
   ```

## Step 2: Upload to S3

1. Create an S3 bucket (or use existing):
   ```bash
   aws s3 mb s3://kids-learning-worksheets --region us-east-1
   ```

2. Run the upload script:
   ```bash
   cd scripts
   ./upload-worksheets.sh kids-learning-worksheets
   ```

3. Update `.env.local` with your bucket URL:
   ```
   NEXT_PUBLIC_S3_BUCKET_URL=https://your-bucket-name.s3.us-east-1.amazonaws.com
   ```

## Step 3: Test Downloads

1. Start the Next.js app:
   ```bash
   npm run dev
   ```

2. Navigate to `/worksheets`
3. Click "Download 10 Free" to test
4. Verify worksheets download correctly

## Worksheet Quality Features

✅ **4-line ruled paper** (standard handwriting practice)
- Top line (blue)
- Middle dotted line (red) 
- Baseline (green)
- Bottom line (blue)

✅ **Proper spacing** for child handwriting
✅ **Tracing guides** with dotted letters
✅ **Visual examples** (colors, shapes, counting dots)
✅ **Progressive difficulty** (guide letters fade out)

## Cost Estimation

- **Storage**: ~1100 images × 50KB = ~55MB = $0.01/month
- **Transfer**: 10 downloads/user × 50KB × 1000 users = 500MB = $0.05/month
- **Total**: ~$0.06/month for 1000 users

## Premium Features (Future)

- User authentication
- Payment integration (Stripe)
- Download tracking
- Subscription management
