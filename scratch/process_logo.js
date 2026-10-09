const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = "C:/Users/Ismail Pasha/.gemini/antigravity/brain/3cfaef18-0fb6-4320-a366-024548762726/.user_uploaded/media_1791561294747.png";
const publicDir = path.join(__dirname, '..', 'public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const outputPath = path.join(publicDir, 'tronx-logo.png');

async function processLogo() {
  try {
    const { data, info } = await sharp(inputPath)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const width = info.width;
    const height = info.height;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // Dark logo pixels (R < 100, G < 100, B < 100)
      if (r < 100 && g < 100 && b < 100) {
        // Keep logo dark, make sure alpha is full
        data[i] = 29;
        data[i + 1] = 33;
        data[i + 2] = 30;
        data[i + 3] = 255;
      } else {
        // Background checkerboard pixel -> set fully transparent
        data[i + 3] = 0;
      }
    }

    await sharp(data, {
      raw: {
        width,
        height,
        channels: 4
      }
    })
      .trim() // trim transparent padding
      .png()
      .toFile(outputPath);

    console.log("Successfully created transparent logo at:", outputPath);
  } catch (err) {
    console.error("Error processing logo:", err);
  }
}

processLogo();
