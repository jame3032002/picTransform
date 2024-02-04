#! /usr/bin/env node
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const { readFileFromDirectory, changeImageType } = require("./helper");
const argv = yargs(hideBin(process.argv)).argv;
const [inputDir, outDir, imageType] = argv._;

async function main() {
  try {
    const imagesName = await readFileFromDirectory({ inputDir });
    changeImageType({ inputDir, outDir, imagesName, imageType });
  } catch (error) {
    console.log(error.message);
  }
}

main();
