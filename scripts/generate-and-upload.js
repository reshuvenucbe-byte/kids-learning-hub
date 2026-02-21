import { createCanvas } from 'canvas';
import { S3Client, PutObjectCommand, CreateBucketCommand } from '@aws-sdk/client-s3';
import { readFileSync } from 'fs';

const BUCKET_NAME = process.env.S3_BUCKET_NAME || 'kids-learning-worksheets-104071297930';
const REGION = process.env.AWS_REGION || 'us-east-1';

const s3Client = new S3Client({ region: REGION });

const draw4LineRuledPaper = (ctx, startY, lineHeight = 80) => {
  const margin = 100;
  const width = 600;
  
  ctx.strokeStyle = '#3B82F6';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(margin, startY);
  ctx.lineTo(margin + width, startY);
  ctx.stroke();
  
  ctx.strokeStyle = '#EF4444';
  ctx.lineWidth = 1;
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(margin, startY + lineHeight / 2);
  ctx.lineTo(margin + width, startY + lineHeight / 2);
  ctx.stroke();
  ctx.setLineDash([]);
  
  ctx.strokeStyle = '#10B981';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(margin, startY + lineHeight * 0.75);
  ctx.lineTo(margin + width, startY + lineHeight * 0.75);
  ctx.stroke();
  
  ctx.strokeStyle = '#3B82F6';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(margin, startY + lineHeight);
  ctx.lineTo(margin + width, startY + lineHeight);
  ctx.stroke();
};

const generateAlphabetWorksheet = (index) => {
  const canvas = createCanvas(800, 1100);
  const ctx = canvas.getContext('2d');
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const letterIndex = index % 26;
  const letter = index < 100 ? letters[letterIndex] : letters[letterIndex].toLowerCase();
  
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 800, 1100);
  
  ctx.fillStyle = '#6366F1';
  ctx.font = 'bold 36px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(`Letter ${letter} Practice`, 400, 50);
  
  ctx.fillStyle = '#9CA3AF';
  ctx.font = '18px Arial';
  ctx.fillText('Kids Learning Hub', 400, 80);
  
  ctx.textAlign = 'left';
  ctx.fillStyle = '#6366F1';
  ctx.font = 'bold 100px Arial';
  ctx.fillText(letter, 120, 170);
  
  ctx.strokeStyle = '#D1D5DB';
  ctx.lineWidth = 3;
  ctx.font = 'bold 80px Arial';
  ctx.setLineDash([8, 8]);
  for (let j = 0; j < 3; j++) {
    ctx.strokeText(letter, 300 + j * 120, 170);
  }
  ctx.setLineDash([]);
  
  for (let row = 0; row < 8; row++) {
    draw4LineRuledPaper(ctx, 250 + row * 100, 80);
    if (row < 2) {
      ctx.fillStyle = '#E5E7EB';
      ctx.font = 'bold 60px Arial';
      ctx.fillText(letter, 110, 250 + row * 100 + 60);
    }
  }
  
  ctx.fillStyle = '#9CA3AF';
  ctx.font = '14px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('www.kidslearninghub.com', 400, 1070);
  
  return canvas.toBuffer('image/png');
};

const generateNumberWorksheet = (index) => {
  const canvas = createCanvas(800, 1100);
  const ctx = canvas.getContext('2d');
  const num = (index % 100) + 1;
  
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 800, 1100);
  
  ctx.fillStyle = '#6366F1';
  ctx.font = 'bold 36px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(`Number ${num} Practice`, 400, 50);
  
  ctx.fillStyle = '#9CA3AF';
  ctx.font = '18px Arial';
  ctx.fillText('Kids Learning Hub', 400, 80);
  
  ctx.textAlign = 'left';
  ctx.fillStyle = '#6366F1';
  ctx.font = 'bold 100px Arial';
  ctx.fillText(num.toString(), 120, 170);
  
  ctx.fillStyle = '#F59E0B';
  for (let d = 0; d < Math.min(num, 20); d++) {
    const dx = 300 + (d % 10) * 30;
    const dy = 130 + Math.floor(d / 10) * 30;
    ctx.beginPath();
    ctx.arc(dx, dy, 10, 0, Math.PI * 2);
    ctx.fill();
  }
  
  for (let row = 0; row < 8; row++) {
    draw4LineRuledPaper(ctx, 250 + row * 100, 80);
    if (row < 2) {
      ctx.fillStyle = '#E5E7EB';
      ctx.font = 'bold 60px Arial';
      ctx.fillText(num.toString(), 110, 250 + row * 100 + 60);
    }
  }
  
  ctx.fillStyle = '#9CA3AF';
  ctx.font = '14px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('www.kidslearninghub.com', 400, 1070);
  
  return canvas.toBuffer('image/png');
};

const generateColorWorksheet = (index) => {
  const canvas = createCanvas(800, 1100);
  const ctx = canvas.getContext('2d');
  const colors = [
    {name: 'Red', hex: '#EF4444'},
    {name: 'Blue', hex: '#3B82F6'},
    {name: 'Green', hex: '#10B981'},
    {name: 'Yellow', hex: '#F59E0B'},
    {name: 'Orange', hex: '#F97316'},
    {name: 'Purple', hex: '#A855F7'},
    {name: 'Pink', hex: '#EC4899'},
    {name: 'Brown', hex: '#92400E'},
    {name: 'Black', hex: '#000000'},
    {name: 'White', hex: '#FFFFFF'}
  ];
  const color = colors[index % colors.length];
  
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 800, 1100);
  
  ctx.fillStyle = '#6366F1';
  ctx.font = 'bold 36px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(`Color: ${color.name}`, 400, 50);
  
  ctx.fillStyle = '#9CA3AF';
  ctx.font = '18px Arial';
  ctx.fillText('Kids Learning Hub', 400, 80);
  
  ctx.fillStyle = color.hex;
  ctx.fillRect(100, 110, 150, 150);
  if (color.name === 'White') {
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.strokeRect(100, 110, 150, 150);
  }
  
  ctx.fillStyle = color.hex === '#FFFFFF' ? '#000000' : color.hex;
  ctx.font = 'bold 60px Arial';
  ctx.textAlign = 'left';
  ctx.fillText(color.name, 280, 200);
  
  for (let row = 0; row < 8; row++) {
    draw4LineRuledPaper(ctx, 300 + row * 95, 75);
    if (row < 2) {
      ctx.fillStyle = '#E5E7EB';
      ctx.font = '50px Arial';
      ctx.fillText(color.name, 110, 300 + row * 95 + 55);
    }
  }
  
  ctx.fillStyle = '#9CA3AF';
  ctx.font = '14px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('www.kidslearninghub.com', 400, 1070);
  
  return canvas.toBuffer('image/png');
};

const generateShapeWorksheet = (index) => {
  const canvas = createCanvas(800, 1100);
  const ctx = canvas.getContext('2d');
  const shapes = ['Circle', 'Square', 'Triangle', 'Rectangle', 'Star', 'Heart', 'Diamond', 'Oval'];
  const shape = shapes[index % shapes.length];
  
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 800, 1100);
  
  ctx.fillStyle = '#6366F1';
  ctx.font = 'bold 36px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(`Shape: ${shape}`, 400, 50);
  
  ctx.fillStyle = '#9CA3AF';
  ctx.font = '18px Arial';
  ctx.fillText('Kids Learning Hub', 400, 80);
  
  const cx = 175, cy = 180, size = 80;
  ctx.strokeStyle = '#6366F1';
  ctx.fillStyle = '#E0E7FF';
  ctx.lineWidth = 4;
  ctx.beginPath();
  
  if (shape === 'Circle') {
    ctx.arc(cx, cy, size, 0, Math.PI * 2);
  } else if (shape === 'Square') {
    ctx.rect(cx - size, cy - size, size * 2, size * 2);
  } else if (shape === 'Triangle') {
    ctx.moveTo(cx, cy - size);
    ctx.lineTo(cx + size, cy + size);
    ctx.lineTo(cx - size, cy + size);
    ctx.closePath();
  } else if (shape === 'Rectangle') {
    ctx.rect(cx - size * 1.2, cy - size * 0.7, size * 2.4, size * 1.4);
  }
  ctx.fill();
  ctx.stroke();
  
  ctx.fillStyle = '#6366F1';
  ctx.font = 'bold 60px Arial';
  ctx.textAlign = 'left';
  ctx.fillText(shape, 350, 200);
  
  for (let row = 0; row < 8; row++) {
    draw4LineRuledPaper(ctx, 280 + row * 95, 75);
    if (row < 2) {
      ctx.fillStyle = '#E5E7EB';
      ctx.font = '50px Arial';
      ctx.fillText(shape, 110, 280 + row * 95 + 55);
    }
  }
  
  ctx.fillStyle = '#9CA3AF';
  ctx.font = '14px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('www.kidslearninghub.com', 400, 1070);
  
  return canvas.toBuffer('image/png');
};

const generateAnimalWorksheet = (index) => {
  const canvas = createCanvas(800, 1100);
  const ctx = canvas.getContext('2d');
  const animals = ['Cat', 'Dog', 'Bird', 'Fish', 'Lion', 'Tiger', 'Bear', 'Elephant', 
                   'Monkey', 'Rabbit', 'Horse', 'Cow', 'Pig', 'Sheep', 'Duck', 'Frog',
                   'Snake', 'Turtle', 'Butterfly', 'Bee'];
  const animal = animals[index % animals.length];
  
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 800, 1100);
  
  ctx.fillStyle = '#6366F1';
  ctx.font = 'bold 36px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(`Animal: ${animal}`, 400, 50);
  
  ctx.fillStyle = '#9CA3AF';
  ctx.font = '18px Arial';
  ctx.fillText('Kids Learning Hub', 400, 80);
  
  ctx.fillStyle = '#6366F1';
  ctx.font = 'bold 70px Arial';
  ctx.textAlign = 'left';
  ctx.fillText(animal, 120, 180);
  
  for (let row = 0; row < 9; row++) {
    draw4LineRuledPaper(ctx, 240 + row * 90, 70);
    if (row < 2) {
      ctx.fillStyle = '#E5E7EB';
      ctx.font = '50px Arial';
      ctx.fillText(animal, 110, 240 + row * 90 + 52);
    }
  }
  
  ctx.fillStyle = '#9CA3AF';
  ctx.font = '14px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('www.kidslearninghub.com', 400, 1070);
  
  return canvas.toBuffer('image/png');
};

const generateWordWorksheet = (index) => {
  const canvas = createCanvas(800, 1100);
  const ctx = canvas.getContext('2d');
  const words = ['cat', 'dog', 'bat', 'hat', 'mat', 'rat', 'sun', 'run', 'fun', 'bun',
                 'pen', 'hen', 'ten', 'den', 'cup', 'pup', 'top', 'hop', 'mop', 'pop',
                 'bed', 'red', 'led', 'fed', 'big', 'dig', 'pig', 'wig', 'box', 'fox'];
  const word = words[index % words.length];
  
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 800, 1100);
  
  ctx.fillStyle = '#6366F1';
  ctx.font = 'bold 36px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(`Word: ${word}`, 400, 50);
  
  ctx.fillStyle = '#9CA3AF';
  ctx.font = '18px Arial';
  ctx.fillText('Kids Learning Hub', 400, 80);
  
  ctx.fillStyle = '#6366F1';
  ctx.font = 'bold 80px Arial';
  ctx.textAlign = 'left';
  ctx.fillText(word, 120, 180);
  
  ctx.strokeStyle = '#D1D5DB';
  ctx.lineWidth = 3;
  ctx.setLineDash([8, 8]);
  for (let j = 0; j < 3; j++) {
    ctx.strokeText(word, 350 + j * 120, 180);
  }
  ctx.setLineDash([]);
  
  for (let row = 0; row < 9; row++) {
    draw4LineRuledPaper(ctx, 250 + row * 90, 70);
    if (row < 3) {
      ctx.fillStyle = '#E5E7EB';
      ctx.font = '50px Arial';
      ctx.fillText(word, 110, 250 + row * 90 + 52);
    }
  }
  
  ctx.fillStyle = '#9CA3AF';
  ctx.font = '14px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('www.kidslearninghub.com', 400, 1070);
  
  return canvas.toBuffer('image/png');
};

const uploadToS3 = async (buffer, key) => {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: 'image/png',
    CacheControl: 'max-age=31536000'
  });
  
  await s3Client.send(command);
};

const main = async () => {
  console.log('Creating S3 bucket...');
  try {
    await s3Client.send(new CreateBucketCommand({ Bucket: BUCKET_NAME }));
    console.log('✅ Bucket created');
  } catch (e) {
    console.log('Bucket already exists');
  }
  
  console.log('\n🎨 Generating and uploading worksheets...\n');
  
  // Alphabet (200)
  console.log('Generating Alphabet worksheets...');
  for (let i = 0; i < 200; i++) {
    const buffer = generateAlphabetWorksheet(i);
    await uploadToS3(buffer, `worksheets/alphabet/alphabet-${i + 1}.png`);
    if ((i + 1) % 20 === 0) console.log(`  ${i + 1}/200 uploaded`);
  }
  console.log('✅ Alphabet complete\n');
  
  // Numbers (200)
  console.log('Generating Number worksheets...');
  for (let i = 0; i < 200; i++) {
    const buffer = generateNumberWorksheet(i);
    await uploadToS3(buffer, `worksheets/numbers/numbers-${i + 1}.png`);
    if ((i + 1) % 20 === 0) console.log(`  ${i + 1}/200 uploaded`);
  }
  console.log('✅ Numbers complete\n');
  
  // Colors (150)
  console.log('Generating Color worksheets...');
  for (let i = 0; i < 150; i++) {
    const buffer = generateColorWorksheet(i);
    await uploadToS3(buffer, `worksheets/colors/colors-${i + 1}.png`);
    if ((i + 1) % 20 === 0) console.log(`  ${i + 1}/150 uploaded`);
  }
  console.log('✅ Colors complete\n');
  
  // Shapes (150)
  console.log('Generating Shape worksheets...');
  for (let i = 0; i < 150; i++) {
    const buffer = generateShapeWorksheet(i);
    await uploadToS3(buffer, `worksheets/shapes/shapes-${i + 1}.png`);
    if ((i + 1) % 20 === 0) console.log(`  ${i + 1}/150 uploaded`);
  }
  console.log('✅ Shapes complete\n');
  
  // Animals (200)
  console.log('Generating Animal worksheets...');
  for (let i = 0; i < 200; i++) {
    const buffer = generateAnimalWorksheet(i);
    await uploadToS3(buffer, `worksheets/animals/animals-${i + 1}.png`);
    if ((i + 1) % 20 === 0) console.log(`  ${i + 1}/200 uploaded`);
  }
  console.log('✅ Animals complete\n');
  
  // Words (200)
  console.log('Generating Word worksheets...');
  for (let i = 0; i < 200; i++) {
    const buffer = generateWordWorksheet(i);
    await uploadToS3(buffer, `worksheets/words/words-${i + 1}.png`);
    if ((i + 1) % 20 === 0) console.log(`  ${i + 1}/200 uploaded`);
  }
  console.log('✅ Words complete\n');
  
  console.log('🎉 ALL DONE! 1100 worksheets uploaded to S3');
  console.log(`Bucket URL: https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com`);
};

main().catch(console.error);
