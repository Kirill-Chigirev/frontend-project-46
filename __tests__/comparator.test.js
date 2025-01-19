import fs from 'fs';
import gendiff from '../src/gendiff.js';

const result = fs.readFileSync('./__fixtures__/result.txt', 'utf-8');

test('gendiff', () => {
  expect(gendiff('file1.json', 'file2.json')).toEqual(result);
  expect(gendiff('file1.yml', 'file2.yml')).toEqual(result);
});
