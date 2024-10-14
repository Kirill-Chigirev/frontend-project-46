import _ from 'lodash';
import parser from './parser.js';

export default (filename1, filename2) => {
  const file1 = parser(filename1);
  const file2 = parser(filename2);
  const file1Keys = Object.keys(file1);
  const file2Keys = Object.keys(file2);
  const filesKeys = [...file1Keys, ...file2Keys];
  const sortedFilesKeys = _.uniq(filesKeys).sort();
  const resultArr = sortedFilesKeys.reduce((acc, key) => {
    if (Object.hasOwn(file1, key) && Object.hasOwn(file2, key)) {
      if (file1[key] === file2[key]) {
        acc.push(`  ${key}: ${file1[key]}`);
      } else {
        acc.push(`- ${key}: ${file1[key]}`);
        acc.push(`+ ${key}: ${file2[key]}`);
      }
    } else if (Object.hasOwn(file1, key) && !Object.hasOwn(file2, key)) {
      acc.push(`- ${key}: ${file1[key]}`);
    } else {
      acc.push(`+ ${key}: ${file2[key]}`);
    }
    return acc;
  }, []);
  return `{\n${resultArr.join('\n')}\n}`;
};
