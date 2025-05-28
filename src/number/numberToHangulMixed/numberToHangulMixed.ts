import { HANGUL_DIGITS } from '@/_internal/constants';

export function numberToHangulMixed(input: number, options?: { spacing?: boolean }): string {
  if (typeof input !== 'number' || Number.isNaN(input)) {
    throw new Error('유효한 숫자를 입력해주세요.');
  }

  if (input === Infinity) {
    return '무한대';
  }
  if (input === -Infinity) {
    return '-무한대';
  }
  if (input === 0) {
    return '0';
  }

  const isNegative = input < 0;
  const absoluteInput = Math.abs(input);

  const [integerPart, decimalPart] = absoluteInput.toString().split('.');

  const koreanParts: string[] = [];
  let remainingDigits = integerPart;
  let placeIndex = 0;

  while (remainingDigits.length > 0) {
    const currentPart = remainingDigits.slice(-4);
    const numericValue = Number(currentPart);

    if (numericValue > 0) {
      const formattedPart = `${numericValue.toLocaleString()}${HANGUL_DIGITS[placeIndex]}`;
      koreanParts.unshift(formattedPart);
    }

    remainingDigits = remainingDigits.slice(0, -4);
    placeIndex++;
  }

  let result: string;
  if (integerPart === '0') {
    result = '0';
  } else {
    result = options?.spacing ? koreanParts.join(' ') : koreanParts.join('');
  }

  if (decimalPart) {
    result += '.' + decimalPart;
  }

  return isNegative ? '-' + result : result;
}
