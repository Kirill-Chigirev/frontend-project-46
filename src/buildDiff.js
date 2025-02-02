import _ from 'lodash';

const buildDiff = (obj1, obj2) => {
  const sortedUniqKeys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  const resultObj = sortedUniqKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (!Object.hasOwn(obj1, key)) {
      return { key, value: value2, type: 'added' };
    }

    if (!Object.hasOwn(obj2, key)) {
      return { key, value: value1, type: 'deleted' };
    }

    if (_.isEqual(value1, value2)) {
      return { key, value: value1, type: 'unchanged' };
    }

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { key, value: buildDiff(value1, value2), type: 'hasChild' };
    }

    return {
      key,
      firstValue: value1,
      value: value2,
      type: 'changed',
    };
  });
  return resultObj;
};

export default buildDiff;
