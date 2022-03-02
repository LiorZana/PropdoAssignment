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

export const capitalizeString = (str: string) => {
  str = str.trim().toLowerCase();
  return !str ? '' : str.slice()[0].toUpperCase() + str.slice(0, str.length - 1);
};
