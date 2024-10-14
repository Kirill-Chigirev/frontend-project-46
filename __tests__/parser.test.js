import parser from '../src/parser.js';

let parsedFile;

beforeAll(() => {
  parsedFile = {
    host: 'hexlet.io', timeout: 50, proxy: '123.234.53.22', follow: false,
  };
});

test('parser', () => {
  expect(parser('file1.json')).toEqual(parsedFile);
  expect(parser('file1.yml')).toEqual(parsedFile);
});
