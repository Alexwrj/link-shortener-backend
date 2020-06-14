module.exports = inputValidator = (source, format) => {
  if (!['body', 'query'].includes(source)) {
    throw new Error('Invalid source input');
  }

  return (req, res, next) => {
    const input = req[source];

    for (key in format) {
      const { type, pattern, required } = format[key];
      const value = input[key];

      if (!(value === 0 || value === false || !!value)) {
        if (required) {
          return next(new Error(`The '${key}' property is required.`));
        }
      }

      console.log('Required passed')

      if (type === 'STRING') {
        if (typeof value !== 'string') {
          return next(new Error(`The value of '${key}' must be string.`));
        }
      }

      if (type === 'NUMBER') {
        const parsedNumber = Number(value);
        if (typeof parsedValue !== 'number' || isNaN(parsedNumber)) {
          return next(new Error(`The value of '${key}' must be number.`));
        }
      }

      console.log('It\'s Okay');

      if (pattern) {
        if (!pattern.test(value)) {
          return next(new Error(`The property ${key} does not match pattern`));
        }
      }
    }

    next();
  };
};
