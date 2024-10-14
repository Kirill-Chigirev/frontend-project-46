import comparator from '../src/comparator.js';

let flatFileDiff;

beforeAll(() => {
  flatFileDiff = '{\n- follow: false\n  host: hexlet.io\n- proxy: 123.234.53.22\n- timeout: 50\n+ timeout: 20\n+ verbose: true\n}';
});

test('comparator', () => {
  expect(comparator('file1.json', 'file2.json')).toEqual(flatFileDiff);
  expect(comparator('file1.yml', 'file2.yml')).toEqual(flatFileDiff);
});
