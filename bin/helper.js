const fs = require("fs");
const sharp = require("sharp");

function readFileFromDirectory({ inputDir }) {
  return new Promise((resolve, reject) => {
    fs.readdir(inputDir, async (err, imagesName) => {
      if (err) {
        return reject(err);
      }

      return resolve(imagesName);
    });
  });
}

function changeImageType({ inputDir, outDir, imagesName, imageType }) {
  let fileType;
  let sharpChangeType;

  if (imageType === "jpg" || imageType === "jpeg") {
    fileType = ".jpg";
    sharpChangeType = (input) => {
      return sharp(input).jpeg({
        quality: 100,
        chromaSubsampling: "4:4:4",
      });
    };
  } else if (imageType === "webp") {
    fileType = ".webp";
    sharpChangeType = (input) => {
      return sharp(input).webp({ lossless: true });
    };
  }

  return imagesName.map((imageName) => {
    fs.readFile(`${inputDir}/${imageName}`, async (err, input) => {
      if (err) {
        console.log(`changeImageType: ${err.message}`);
        return;
      }

      let imgName = imageName.split(".");
      imgName.pop();
      imgName = `${imgName.join(".")}${fileType}`;

      try {
        await sharpChangeType(input).toFile(`${outDir}/${imgName}`);
        console.log(`filename: ${imageName}, status: Done`);
      } catch (error) {
        console.log(`filename: ${imageName}, status: Error, ${error.message}`);
      }
    });
  });
}

module.exports = {
  readFileFromDirectory,
  changeImageType,
};
