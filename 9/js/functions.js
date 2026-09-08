/* eslint-disable no-unused-vars */
const checkStringLength = (str, maxLength) => str.length <= maxLength;

function isPalindrome(string) {
  const cleanString = string.toLowerCase().replace(/[^a-zа-яё0-9]/gi, '');
  const reversedString = cleanString.split('').reverse().join('');

  return cleanString === reversedString;
}

function extractNumber(value) {
  const str = value.toString();
  let resultStr = '';

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (!Number.isNaN(parseInt(char, 10))) {
      resultStr += char;
    }
  }

  if (resultStr === '') {
    return NaN;
  }

  return parseInt(resultStr, 10);
}
/* eslint-enable no-unused-vars */
