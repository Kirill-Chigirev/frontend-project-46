import parseFile from '../src/parser.js';

let parseFiledFile;

beforeAll(() => {
  parseFiledFile = {
    host: 'hexlet.io', timeout: 50, proxy: '123.234.53.22', follow: false,
  };
});

test('parseFile', () => {
  expect(parseFile('file1.json')).toEqual(parseFiledFile);
  expect(parseFile('file1.yml')).toEqual(parseFiledFile);
});
