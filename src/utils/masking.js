export function upper(value) {
  return value && value.toUpperCase();
}

export function letter(value) {
  if (!value) {
    return value;
  }
  // const onlyLetters = value.replace(/[^\a-zA-Z]/g, '')
  const onlyLetters = value.replace(/\d+/g, '');
  return onlyLetters;
}

export function number(value) {
  if (!value) {
    return value;
  }
  const onlyNums = value.replace(/[^\d]/g, '');
  return onlyNums;
}

export function float(value) {
  if (!value) {
    return value;
  }
  const onlyNums = value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
  return onlyNums;
}


export function currency(value) {
  if (!value) {
    return value;
  }

  const numbered = value.toString().replace(/[\D]/g, '');
  const clearDelimiter = new RegExp('^(0|\\.)');
  const clearSeparator = new RegExp('(\\,)$');
  let money = numbered.substr(0, numbered.length - 0);
  let masked = money.substr(0, money.length % 3);
  let cents = new Array(0 + 1).join('0');
  money = money.substr(money.length % 3, money.length);
  for (let i = 0, len = money.length; i < len; i++) {
    if (i % 3 === 0) {
      masked += '.';
    }
    masked += money[i];
  }
  masked = masked.replace(clearDelimiter, '');
  masked = masked.length ? masked : '0';
  const beginCents = numbered.length - 0;
  const centsValue = numbered.substr(beginCents, 0);
  const centsLength = centsValue.length;
  const centsSliced = (centsLength < 0) ? 0 : centsLength;
  cents = (cents + centsValue).slice(-centsSliced);
  const output = `${masked},${cents}`;
  return output.replace(clearSeparator, '');
}
