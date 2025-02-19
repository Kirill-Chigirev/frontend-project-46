import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return (typeof value === 'string') ? `'${value}'` : value;
};

export default (difference) => {
  const iter = (data, path) => {
    const result = data.map((item) => {
      const {
        key, type, firstValue, value,
      } = item;
      const buildPath = () => (path === '' ? key : `${path}.${key}`);
      switch (type) {
        case 'added':
          return `Property '${buildPath()}' was added with value: ${stringify(value)}\n`;
        case 'deleted':
          return `Property '${buildPath()}' was removed\n`;
        case 'changed':
          return `Property '${buildPath()}' was updated. From ${stringify(firstValue)} to ${stringify(value)}\n`;
        case 'unchanged':
          return null;
        case 'hasChild':
          return iter(value, buildPath());
        default:
          throw Error('There is no such type');
      }
    });

    return result.join('');
  };

  const result = iter(difference, '');

  return result.trim();
};
