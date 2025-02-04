import plainFormat from './plainFormat.js';
import stylishFormat from './stylishFormat.js';

export default (format) => {
  const formatters = {
    stylish: stylishFormat,
    plain: plainFormat,
  };

  return formatters[format];
};
