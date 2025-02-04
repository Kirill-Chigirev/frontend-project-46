import { fileURLToPath } from 'url';
import path from 'path';
import { readFileSync } from 'fs';
import parseFile from './parser.js';
import buildDiff from './buildDiff.js';
import formatter from './formatters/index.js';

const readfile = (filepath) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const absolutePath = path.join(__dirname, '..', '__fixtures__', filepath);
  const content = readFileSync(absolutePath, 'utf-8');
  return content;
};

const getExtension = (file) => file.split('.').at(-1);

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const file1 = parseFile(getExtension(filepath1), readfile(filepath1));
  const file2 = parseFile(getExtension(filepath2), readfile(filepath2));
  const diffTree = buildDiff(file1, file2);
  return formatter(format)(diffTree);
};

export default genDiff;
