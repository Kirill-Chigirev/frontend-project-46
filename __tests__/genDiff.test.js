import fs from 'fs';
import genDiff from '../src/index.js';

const result = fs.readFileSync('./__fixtures__/result.txt', 'utf-8');
const plainResult = fs.readFileSync('./__fixtures__/plainResult.txt', 'utf-8');

test('genDiff', () => {
  expect(genDiff('file1.json', 'file2.json')).toEqual(result);
  expect(genDiff('file1.yml', 'file2.yml')).toEqual(result);
  expect(genDiff('file1.json', 'file2.json', 'plain')).toEqual(plainResult);
  expect(genDiff('file1.yml', 'file2.yml', 'plain')).toEqual(plainResult);
});
