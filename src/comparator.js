import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import _ from 'lodash';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

export default (filename1, filename2) => {
  const file1 = JSON.parse(readFile(filename1));
  const file2 = JSON.parse(readFile(filename2));
  const file1Keys = Object.keys(file1);
  const file2Keys = Object.keys(file2);
  const filesKeys = [...file1Keys, ...file2Keys];
  const sortedFilesKeys = _.uniq(filesKeys).sort();
  const resultArr = sortedFilesKeys.reduce((acc, key) => {
    if (Object.hasOwn(file1, key) && Object.hasOwn(file2, key)) {
      if (file1[key] === file2[key]) {
        acc.push(`  ${key}: ${file1[key]}`);
      } else {
        acc.push(`- ${key}: ${file1[key]}`);
        acc.push(`+ ${key}: ${file2[key]}`);
      }
    } else if (Object.hasOwn(file1, key) && !Object.hasOwn(file2, key)) {
      acc.push(`- ${key}: ${file1[key]}`);
    } else {
      acc.push(`+ ${key}: ${file2[key]}`);
    }
    return acc;
  }, []);
  return `{\n${resultArr.join('\n')}\n}`;
};
