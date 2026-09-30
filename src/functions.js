export function unique(arr) {
  return [...new Set(arr)];
}

export function groupBy(arr, keyFn) {
  return arr.reduce((result, item) => {
    const key = keyFn(item);

    if (!result[key]) {
      result[key] = [];
    }

    result[key].push(item);

    return result;
  }, {});
}

export function chunk(arr, size) {
  if (!Array.isArray(arr)) {
    throw new TypeError("arr must be an array");
  }

  if (size <= 0) {
    throw new Error("size must be greater than 0");
  }

  const result = [];

  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }

  return result;
}

export function deepClone(value) {
  if (value === null || typeof value !== "object") {
    return value;
  }

  if (value instanceof Date) {
    return new Date(value.getTime());
  }

  if (Array.isArray(value)) {
    return value.map(item => deepClone(item));
  }

  const result = {};

  for (const [key, item] of Object.entries(value)) {
    result[key] = deepClone(item);
  }

  return result;
}

export function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn(...args);
    cache.set(key, result);

    return result;
  };
}

export function counter() {
  let count = 0;

  return {
    inc() {
      count += 1;
      return count;
    },

    dec() {
      count -= 1;
      return count;
    },

    value() {
      return count;
    }
  };
}
