import parse from '../src/parse.js';

let parsedFile;

beforeAll(() => {
  parsedFile = {
    host: 'hexlet.io', timeout: 50, proxy: '123.234.53.22', follow: false,
  };
});

test('parse', () => {
  expect(parse('file1.json')).toEqual(parsedFile);
  expect(parse('file1.yml')).toEqual(parsedFile);
});
