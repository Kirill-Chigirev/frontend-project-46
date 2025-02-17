import _ from 'lodash';

export default (difference) => {
  const iter = (data, depth) => {
    const indent = '    ';

    const stringify = (value, newDepth) => {
      if (!_.isObject(value)) {
        return value;
      }

      const sortedKeys = _.sortBy(Object.keys(value));

      const currentResult = sortedKeys.map((key) => {
        const string = `    ${key}: ${stringify(value[key], newDepth + 1)}`;
        return `${indent.repeat(newDepth)}${string}`;
      });

      return `{\n${currentResult.join('\n')}\n${indent.repeat(newDepth)}}`;
    };

    const result = data.map((item) => {
      const {
        key, type, firstValue, value,
      } = item;
      switch (type) {
        case 'added':
          return `  ${indent.repeat(depth)}+ ${key}: ${stringify(value, depth + 1)}`;
        case 'deleted':
          return `  ${indent.repeat(depth)}- ${key}: ${stringify(value, depth + 1)}`;
        case 'changed':
          return `  ${indent.repeat(depth)}- ${key}: ${stringify(firstValue, depth + 1)}\n  ${indent.repeat(depth)}+ ${key}: ${stringify(value, depth + 1)}`;
        case 'unchanged':
          return `    ${indent.repeat(depth)}${key}: ${value}`;
        case 'hasChild':
          return `    ${indent.repeat(depth)}${key}: {\n${iter(value, depth + 1)}\n    ${indent.repeat(depth)}}`;
        default:
          throw Error('нет такого типа');
      }
    });

    return result.join('\n');
  };

  const result = iter(difference, 0);

  return `{\n${result}\n}`;
};
