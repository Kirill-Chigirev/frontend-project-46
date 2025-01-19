// import _ from 'lodash';
import parse from './parse.js';
import stylish from './formatters/stylishFormat.js';

export default (filename1, filename2) => {
  const parsedFile1 = parse(filename1);
  const parsedFile2 = parse(filename2);

  const buildStructure = (file1, file2) => {
    const file1Keys = Object.keys(file1);
    const file2Keys = Object.keys(file2);
    const filesKeys = [...new Set([...file1Keys, ...file2Keys])].sort();

    const resultArr = filesKeys.map((key) => {
      const existsInFile1 = Object.hasOwn(file1, key);
      const existsInFile2 = Object.hasOwn(file2, key);

      if (typeof file1[key] === 'object' && file1[key] !== null && typeof file2[key] === 'object' && file2[key] !== null) {
        return { key, type: 'nested', children: buildStructure(file1[key], file2[key]) };
      }

      if (existsInFile1 && existsInFile2) {
        return file1[key] === file2[key]
          ? { key, value: file1[key], type: 'unchanged' }
          : {
            key, value1: file1[key], value2: file2[key], type: 'changed',
          };
      }

      return existsInFile1
        ? { key, value: file1[key], type: 'deleted' }
        : { key, value: file2[key], type: 'added' };
    });
    return resultArr;
  };

  const result = buildStructure(parsedFile1, parsedFile2);
  return stylish(result);
};
