import _ from 'lodash';

export default (difference) => {
  const result = [];

  const iter = (data, depth) => {
    const indent = '    ';

    const stringify = (value, newDepth) => {
      if (!_.isObject(value)) {
        return value;
      }

      const currentResult = Object.keys(value).sort().map((key) => {
        const string = `    ${key}: ${stringify(value[key], newDepth + 1)}`;
        return `${indent.repeat(newDepth)}${string}`;
      });

      return `{\n${currentResult.join('\n')}\n${indent.repeat(newDepth)}}`;
    };

    data.forEach((item) => {
      const {
        key, type, firstValue, value,
      } = item;
      switch (type) {
        case 'added':
          result.push(`  ${indent.repeat(depth)}+ ${key}: ${stringify(value, depth + 1)}`);
          break;
        case 'deleted':
          result.push(`  ${indent.repeat(depth)}- ${key}: ${stringify(value, depth + 1)}`);
          break;
        case 'changed':
          result.push(`  ${indent.repeat(depth)}- ${key}: ${stringify(firstValue, depth + 1)}`);
          result.push(`  ${indent.repeat(depth)}+ ${key}: ${stringify(value, depth + 1)}`);
          break;
        case 'unchanged':
          result.push(`    ${indent.repeat(depth)}${key}: ${value}`);
          break;
        case 'hasChild':
          result.push(`    ${indent.repeat(depth)}${key}: {`);
          iter(value, depth + 1);
          result.push(`    ${indent.repeat(depth)}}`);
          break;
        default:
          break;
      }
    });
  };

  iter(difference, 0);

  return `{\n${result.join('\n')}\n}`;
};
