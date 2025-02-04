import _ from 'lodash';

export default (difference) => {
  const result = [];

  const iter = (data, path) => {
    const stringify = (value) => {
      if (_.isObject(value)) {
        return '[complex value]';
      }
      return (typeof value === 'string') ? `'${value}'` : value;
    };

    data.forEach((item) => {
      const {
        key, type, firstValue, value,
      } = item;
      const buildPath = () => (path === '' ? key : `${path}.${key}`);
      switch (type) {
        case 'added':
          result.push(`Property '${buildPath()}' was added with value: ${stringify(value)}`);
          break;
        case 'deleted':
          result.push(`Property '${buildPath()}' was removed`);
          break;
        case 'changed':
          result.push(`Property '${buildPath()}' was updated. From ${stringify(firstValue)} to ${stringify(value)}`);
          break;
        case 'unchanged':
          break;
        case 'hasChild':
          iter(value, buildPath());
          break;
        default:
          break;
      }
    });
  };

  iter(difference, '');

  return result.join('\n');
};
