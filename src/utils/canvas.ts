import { createCanvas, loadImage } from 'canvas';

async function blur(image: string | Buffer): Promise<Buffer> {
  if (!image) throw new Error('Image was not provided!');
  const img = await loadImage(image);
  const canvas = createCanvas(img.width, img.height);
  const context = canvas.getContext('2d');

  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(img, 0, 0, canvas.width / 4, canvas.height / 4);
  context.imageSmoothingEnabled = true;
  context.drawImage(
    canvas,
    0,
    0,
    canvas.width / 4,
    canvas.height / 4,
    0,
    0,
    canvas.width + 5,
    canvas.height + 5,
  );

  return canvas.toBuffer();
}

export { blur };
