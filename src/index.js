import _ from 'lodash';
import fs from 'fs';
import path from 'path';

export default (filepath1, filepath2) => {
  const obj1 = JSON.parse(fs.readFileSync(path.resolve(filepath1)));
  const obj2 = JSON.parse(fs.readFileSync(path.resolve(filepath2)));
  const allKeys = [...Object.keys(obj1), ...Object.keys(obj2)];
  const sortedKeys = _.sortBy(_.uniq(allKeys));
  const diff = sortedKeys.reduce((acc, key) => {
    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (obj1[key] === obj2[key]) {
        return [...acc, `    ${key}: ${obj1[key]}`];
      }
      return [...acc, `  - ${key}: ${obj1[key]}`, `  + ${key}: ${obj2[key]}`];
    }
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      return [...acc, `  - ${key}: ${obj1[key]}`];
    }
    if (!_.has(obj1, key) && _.has(obj2, key)) {
      return [...acc, `  + ${key}: ${obj2[key]}`];
    }
    return acc;
  }, []);

  const result = ['{', ...diff, '}'].join('\n');
  return result;
};
