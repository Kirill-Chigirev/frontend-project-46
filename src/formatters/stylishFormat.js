export default (difference) => {
  console.log(difference);
  const result = [];
  difference.forEach((obj) => {
    const iter = (data, depth) => {
      const indent = '    ';
      const state = {
        deleted: `  ${indent.repeat(depth)}- ${data.key}: ${data.value}`,
        added: `  ${indent.repeat(depth)}+ ${data.key}: ${data.value}`,
        changed: `  ${indent.repeat(depth)}- ${data.key}: ${data.value1}\n  ${indent.repeat(depth)}+ ${data.key}: ${data.value2}`,
        unchanged: `    ${indent.repeat(depth)}${data.key}: ${data.value}`,
      };

      if (data.children) {
        data.children.forEach((child) => iter(child, depth + 1));
      }

      result.push(state[data.type]);
    };

    return iter(obj, 0);
  });

  return `{\n${result.join('\n')}\n}`;
};
