//i can maybe format numbers in the back so i wont need to call this function over and over on each number

export const formatNumber = (num) => {
  const options = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 6,
  };
  return num.toLocaleString("he", options);
};

export const getRandomDate = (start, end) => {
  // start = new Date(2001, 0, 1)
  // end = new Date()
  return new Date(start + Math.random() * (end - start)).getTime()
}
export const _getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
export const _getRandomDecimal = (min, max, decimalPlaces) => {
  var rand =
    Math.random() < 0.5
      ? (1 - Math.random()) * (max - min) + min
      : Math.random() * (max - min) + min; // could be min or max or anything in between
  var power = Math.pow(10, decimalPlaces);
  return Math.floor(rand * power) / power;
}