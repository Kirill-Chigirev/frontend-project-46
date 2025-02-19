import path from 'path';
import { readFileSync } from 'fs';
import parseFile from './parser.js';
import buildDiff from './buildDiff.js';
import formatter from './formatters/index.js';

const readFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  return readFileSync(absolutePath, 'utf-8');
};

const getExtension = (file) => file.split('.').at(-1);

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const file1 = parseFile(getExtension(filepath1), readFile(filepath1));
  const file2 = parseFile(getExtension(filepath2), readFile(filepath2));
  const diffTree = buildDiff(file1, file2);
  if (format === 'json') {
    return JSON.stringify(diffTree[0], null, 2);
  }
  return formatter(format)(diffTree);
};

export default genDiff;
