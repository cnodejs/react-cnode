const path = require('path');
const compressing = require('compressing');

const source = path.resolve(__dirname, '../dist');
const target = path.resolve(__dirname, '../dist.zip');

const run = async () => {
  try {
    await compressing.zip.compressDir(source, target);
    console.log('compressing:zip:done');
  } catch (error) {
    console.log(error);
  }
};

run();
