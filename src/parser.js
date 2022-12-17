import fs from 'fs';
import path from 'path';
import YMAL from 'js-yaml';

export default (filepath1, filepath2) => {
  let obj1;
  let obj2;
  if (path.extname(filepath1) === '.json' && path.extname(filepath2) === '.json') {
    obj1 = JSON.parse(fs.readFileSync(path.resolve(filepath1)));
    obj2 = JSON.parse(fs.readFileSync(path.resolve(filepath2)));
  } else {
    obj1 = YMAL.load(fs.readFileSync(path.resolve(filepath1)));
    obj2 = YMAL.load(fs.readFileSync(path.resolve(filepath2)));
  }

  return [obj1, obj2];
};
