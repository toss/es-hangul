import {
  HANGUL_DIGITS_MAX,
  HANGUL_NUMBERS_FOR_DECIMAL,
  HANGUL_NUMBERS,
  HANGUL_DIGITS,
  HANGUL_CARDINAL,
} from '@/_internal/constants';

/**
 * @deprecated 더 유연하게 사용 가능한 `numberToHangul`을 이용해 주세요
 */
export function amountToHangul(amount: string | number) {
  const [rawIntegerPart, rawDecimalPart] = String(amount)
    .replace(/[^\d.]+/g, '')
    .split('.');

  const integerPart = rawIntegerPart !== '0' ? rawIntegerPart.replace(/^0+/, '') : rawIntegerPart;

  if (integerPart.length > HANGUL_DIGITS_MAX) {
    throw new Error(`convert range exceeded : ${amount}`);
  }
  const decimalPart = rawDecimalPart?.replace(/0+$/, '');

  const result = [];
  let pronunDigits = true;

  if (integerPart === '0' || (integerPart === '' && rawDecimalPart)) {
    result.push(HANGUL_NUMBERS_FOR_DECIMAL[0]);
  } else {
    for (let i = 0; i < integerPart.length - 1; i++) {
      const digit = integerPart.length - i - 1;

      if (integerPart[i] > '1' || digit % 4 === 0 || i === 0) {
        const hangulNumber = HANGUL_NUMBERS[Number(integerPart[i])];

        if (hangulNumber) {
          result.push(hangulNumber);
          pronunDigits = true;
        }
      }

      if (pronunDigits && digit % 4 === 0) {
        result.push(HANGUL_DIGITS[digit / 4]);
        pronunDigits = false;
      }

      if (integerPart[i] !== '0') {
        result.push(HANGUL_CARDINAL[digit % 4]);
      }
    }
    result.push(HANGUL_NUMBERS[Number(integerPart[integerPart.length - 1])]);
  }

  if (decimalPart) {
    result.push('점');

    for (let i = 0; i < decimalPart.length; i++) {
      result.push(HANGUL_NUMBERS_FOR_DECIMAL[Number(decimalPart[i])]);
    }
  }

  return result.join('');
}
