import { AddressObject } from '@/types/address';

export const getRandom = (max: number) => Math.random() * max;
export const getRandomInt = (max: number) => Math.floor(Math.random() * max);
export const getRandomInRange = (min: number, max: number) => Math.random() * (max - min) + min;
export const getRandomIntInRange = (min: number, max: number, inclusive = false) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + Number(inclusive)) + min);
};

export const isEmptyObject = (obj: { [key: string | number]: any }) =>
  obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype;

export const abbreviateNumber = (val: number) => {
  const s = ['', 'k', 'm', 'b', 't'];
  const sNum = Math.floor(('' + val).length / 3);
  let sVal: string | number = parseFloat((sNum !== 0 ? val / Math.pow(1000, sNum) : val).toPrecision(2));
  if (sVal % 1 !== 0) {
    sVal = sVal.toFixed(1);
  }
  return sVal + s[sNum];
};

export const stringToNumber = (str: string) => {
  str = str.replace(/,|\s/g, '');
  const num = parseInt(str);
  return Number.isNaN(num) ? 0 : num;
};

export const stringOrNumberToNumber = (strOrNum: string | number) => {
  if (typeof strOrNum === 'number') return strOrNum;
  strOrNum = strOrNum.replace(/,|\s/g, '');
  const num = parseInt(strOrNum);
  return Number.isNaN(num) ? 0 : num;
};

export const capitalizeString = (str: string) => {
  str = str.trim().toLowerCase();
  return !str ? '' : str.slice()[0].toUpperCase() + str.slice(0, str.length - 1);
};

export const isInRange = (value: number, min: number, max: number, inclusive = true) =>
  inclusive ? value >= min && value <= max : value > min && value < max;

export const filterMap = <T, R>(
  array: T[],
  filterCallback: (value: T, index: number, array: T[]) => boolean,
  mapCallback: (value: T, index: number, array: T[]) => R
) => {
  const result: R[] = [];
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (filterCallback(element, i, array)) {
      result.push(mapCallback(element, i, array));
    }
  }
  return result;
};

export const conditionalFilterMap = <T, R>(
  array: T[],
  filterCallback: true | ((value: T, index: number, array: T[]) => boolean),
  mapCallback: (value: T, index: number, array: T[]) => R
) => {
  if (filterCallback === true) {
    return array.map(mapCallback);
  }
  return filterMap(array, filterCallback, mapCallback);
};

export const limitString = (str: string, maxLength: number, threeDots = false) =>
  str.slice(0, Math.min(maxLength, str.length)) + (threeDots && maxLength < str.length ? '...' : '');

export const mapObject = <T extends UTILS.GenericObject, R extends any>(
  object: T,
  callback: (key: keyof T, value: T[keyof T]) => R
) => {
  const target = {} as UTILS.MappedGenericObject<T, ReturnType<typeof callback>>;
  for (const [key, value] of Object.entries<T>(object)) {
    target[key as keyof T] = callback(key, value as T[keyof T]);
  }
  return target;
};

export const mapObjectToValue = <T extends UTILS.GenericObject, V extends any>(
  object: T,
  value: V
): UTILS.MappedGenericObject<T, V> => {
  const result = {} as UTILS.MappedGenericObject<T, V>;
  const keys = Object.keys(object) as (keyof T)[];
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (Object.prototype.hasOwnProperty.call(object, key as any)) result[key as keyof T] = value;
  }
  return result;
};
