import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const BUCKET_NAME = process.env.S3_BUCKET_NAME || 'kids-learning-worksheets-104071297930';
const REGION = process.env.AWS_REGION || 'us-east-1';

const s3Client = new S3Client({ region: REGION });

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const index = searchParams.get('index');
  
  if (!type || !index) {
    return Response.json({ error: 'Missing parameters' }, { status: 400 });
  }
  
  const key = `worksheets/${type}/${type}-${index}.png`;
  
  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key
    });
    
    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    
    return Response.json({ url });
  } catch (error) {
    return Response.json({ error: 'Failed to generate URL' }, { status: 500 });
  }
}
