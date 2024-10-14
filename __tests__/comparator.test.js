import comparator from '../src/comparator.js';

let flatJson;

beforeAll(() => {
  flatJson = '{\n- follow: false\n  host: hexlet.io\n- proxy: 123.234.53.22\n- timeout: 50\n+ timeout: 20\n+ verbose: true\n}';
});

test('comparator', () => {
  expect(comparator('file1.json', 'file2.json')).toEqual(flatJson);
});
