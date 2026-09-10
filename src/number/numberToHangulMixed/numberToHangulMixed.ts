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

  // 1e21 이상의 수와 1e-6 미만의 소수는 Number.prototype.toString()이 과학적 표기법
  // 문자열("1e+21" 등)을 반환하므로(ECMA-262), 그대로 변환하면 "undefined"가 섞인 문자열이나
  // 잘못된 값이 조용히 노출된다. 기존 유효성 검증처럼 에러를 던져 silent failure를 막는다.
  if (absoluteInput >= 1e21 || (absoluteInput !== 0 && absoluteInput < 1e-6)) {
    throw new Error('변환할 수 있는 범위를 벗어난 숫자입니다.');
  }

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
