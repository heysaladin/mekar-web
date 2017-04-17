import config from 'config';
import dataDatetime from '../data/datetime';

export function canonical(path) {
  return config.appBaseUrl + path;
}

export function slugify(text) {
  if (typeof text === 'undefined') {
    return null;
  }
  return text.toString().toLowerCase();
    // .replace(/\s+/g, '-')           // Replace spaces with -
    // .replace(/[^]+/g, '')       // Remove all non-word chars
    // .replace(/+/g, '-')         // Replace multiple - with single -
    // .replace(/^-+/, '')             // Trim - from start of text
    // .replace(/-+$/, '');            // Trim - from end of text
}

// export function category(value) {
//   if (!value) {
//     return value;
//   }

//   const dataCategory = dataPawnSimulation.categories.find(data => data.value === value);

//   return (dataCategory) ? dataCategory.label : 'Tidak diketahui';
// }

// export function color(value) {
//   if (!value) {
//     return value;
//   }

//   const dataColor = dataPawnSimulation.colors.find(data => data.value === value);

//   return dataColor.label;
// }

// export function gold(value) {
//   if (!value) {
//     return value;
//   }

//   const dataGold = dataPawnSimulation.gold.types.find(data => data.value === value);

//   return dataGold.label;
// }

/**
 * ==================
 * Common Filters
 * ==================
 */

export function currency(value) {
  if (!value) {
    return value;
  }

  const rupiah = `Rp ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;

  return rupiah;
}

export function date(value, monthOnly) {
  if (!value || value === '0001-01-01T00:00:00Z') {
    return null;
  }

  let newDate = null;

  if (typeof value === 'string') {
    const rawDate = value.split('-');

    if (rawDate.length === 3) {
      let formattedDate = rawDate[0];
      formattedDate += (rawDate[1].length === 1) ? `-0${rawDate[1]}` : `-${rawDate[1]}`;
      formattedDate += (rawDate[2].length === 1) ? `-0${rawDate[2]}` : `-${rawDate[2]}`;
      newDate = new Date(formattedDate);
    } else {
      newDate = new Date(value);
    }
  } else {
    newDate = new Date(value);
  }

  if (!(newDate instanceof Date) || isNaN(newDate)) {
    return `Unable convert to Date object  -> ${value}`;
  }

  const datelabel = `${dataDatetime.months[newDate.getMonth()].fullLabel} ${newDate.getFullYear()}`;

  if (monthOnly) {
    return datelabel;
  }

  return `${newDate.getDate()} ${datelabel}`;
}

export function prepareDate(value) {
  if (!value) {
    return value;
  }

  const formattedDate = `${value.getFullYear()}-${(value.getMonth() + 1)}-${value.getDate()}`;

  return formattedDate;
}
