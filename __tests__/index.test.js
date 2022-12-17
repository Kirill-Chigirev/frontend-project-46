import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('flat json', () => {
  const receivedResult = readFile('result.txt');
  const expectedResult = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(expectedResult).toBe(receivedResult);
});

test('flat yml', () => {
  const receivedResult = readFile('result.txt');
  const expectedResult = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
  expect(expectedResult).toBe(receivedResult);
});
