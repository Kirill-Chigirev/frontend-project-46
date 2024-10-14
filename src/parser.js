import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

const parse = (filepath) => {
  const extension = path.extname(filepath);
  let result;
  if (extension === '.json') {
    result = JSON.parse(readFile(filepath));
  } else if (extension === '.yml' || extension === '.yaml') {
    result = yaml.load(readFile(filepath));
  }

  return result;
};

export default parse;
