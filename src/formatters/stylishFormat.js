const formatter = (difference) => {
  const result = [];

  const iter = (data, depth) => {
    const indent = '    ';

    data.forEach((item) => {
      const {
        key, type, firstValue, value,
      } = item;
      switch (type) {
        case 'added':
          result.push(`  ${indent.repeat(depth)}+ ${key}: ${value}`);
          break;
        case 'deleted':
          result.push(`  ${indent.repeat(depth)}- ${key}: ${value}`);
          break;
        case 'changed':
          result.push(`  ${indent.repeat(depth)}- ${key}: ${firstValue}`);
          result.push(`  ${indent.repeat(depth)}+ ${key}: ${value}`);
          break;
        case 'unchanged':
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

export default formatter;
