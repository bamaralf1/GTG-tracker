const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SVG_SRC = path.resolve(__dirname, '../../icons/icon-512.svg');
const BUILD_DIR = path.resolve(__dirname, '../build');

async function generate() {
  if (!fs.existsSync(BUILD_DIR)) fs.mkdirSync(BUILD_DIR, { recursive: true });

  const svg = fs.readFileSync(SVG_SRC, 'utf8');

  await sharp(Buffer.from(svg))
    .resize(256, 256)
    .png()
    .toFile(path.join(BUILD_DIR, 'icon.png'));

  await sharp(Buffer.from(svg))
    .resize(64, 64)
    .png()
    .toFile(path.join(BUILD_DIR, 'icon-64.png'));

  console.log('Icons generated in', BUILD_DIR);
}

generate().catch(err => {
  console.error('Icon generation failed:', err);
  process.exit(1);
});
