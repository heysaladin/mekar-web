const isEmpty = value => value === undefined || value === null || value === '';
const join = rules => (value, data, params) => rules.map(rule => rule(value, data, params)).filter(error => !!error)[0];

export function email(value) {
  // Need to improve this regex
  if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Alamat email salah';
  }
}

export function required(value) {
  if (isEmpty(value)) {
    return 'Harus diisi';
  }
}

export function minLength(min) {
  return value => {
    if (!isEmpty(value) && value.length < min) {
      return `Harus minimal ${min} karakter`;
    }
  };
}

export function maxLength(max) {
  return value => {
    if (!isEmpty(value) && value.length > max) {
      return `Harus maksimal ${max} karakter`;
    }
  };
}

export function integer(value) {
  if (!isEmpty(value) && !Number.isInteger(Number(value))) {
    return 'Harus berupa angka';
  }
}

export function oneOf(enumeration) {
  return value => {
    if (!~enumeration.indexOf(value)) {
      return `Harus salah satu dari : ${enumeration.join(', ')}`;
    }
  };
}

export function match(field) {
  return (value, data) => {
    if (data) {
      if (value !== data[field]) {
        return 'Tidak cocok';
      }
    }
  };
}

export function lessThan(field, label) {
  return (value, data) => {
    if (data) {
      if (parseFloat(value) > parseFloat(data[field])) {
        return `Harus lebih kecil dari ${label}`;
      }
    }
  };
}

export function greaterThan(field, label) {
  return (value, data) => {
    if (data) {
      if (parseFloat(value) < parseFloat(data[field])) {
        return `Harus lebih besar dari ${label}`;
      }
    }
  };
}

export function createValidator(rules, params) {
  return (data = {}) => {
    const errors = {};
    Object.keys(rules).forEach(key => {
      const rule = join([].concat(rules[key])); // concat enables both functions and arrays of functions
      const error = rule(data[key], data, { key, ...params });
      if (error) {
        errors[key] = error;
      }
    });
    return errors;
  };
}
