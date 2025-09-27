import { HANGUL_CARDINAL, HANGUL_DIGITS, HANGUL_NUMBERS, HANGUL_NUMBERS_FOR_DECIMAL } from '@/_internal/constants';

export function numberToHangul(input: number, options?: { spacing?: boolean }): string {
  if (typeof input !== 'number' || Number.isNaN(input)) {
    throw new Error('유효한 숫자를 입력해주세요.');
  }

  if (input === Infinity) {
    return '무한대';
  }
  if (input === -Infinity) {
    return options?.spacing ? '마이너스 무한대' : '마이너스무한대';
  }
  if (input === 0) {
    return '영';
  }

  const isNegative = input < 0;
  const absoluteInput = Math.abs(input);

  const [integerPart, decimalPart] = absoluteInput.toString().split('.');

  const koreanParts: string[] = [];
  let remainingDigits = integerPart;
  let placeIndex = 0;

  while (remainingDigits.length > 0) {
    const currentPart = remainingDigits.slice(-4);

    const koreanNumber = numberToKoreanUpToThousand(Number(currentPart));
    if (koreanNumber !== '') {
      koreanParts.unshift(`${koreanNumber}${HANGUL_DIGITS[placeIndex]}`);
    }

    remainingDigits = remainingDigits.slice(0, -4);
    placeIndex++;
  }

  let result = koreanParts
    .filter(part => part !== '')
    .join(options?.spacing ? ' ' : '')
    .trim();

  if (integerPart === '0') {
    result = '영';
  }

  if (decimalPart) {
    const decimalKorean = decimalPart
      .split('')
      .map(digit => HANGUL_NUMBERS_FOR_DECIMAL[Number(digit)])
      .join('');

    result += options?.spacing ? '점 ' + decimalKorean : '점' + decimalKorean;
  }

  if (isNegative) {
    result = options?.spacing ? `마이너스 ${result}` : `마이너스${result}`;
  }
  return result;
}

function numberToKoreanUpToThousand(num: number): string {
  const koreanDigits = num
    .toString()
    .split('')
    .reverse()
    .map((digit, index) => (digit === '0' ? '' : HANGUL_NUMBERS[Number(digit)] + HANGUL_CARDINAL[index]))
    .reverse()
    .join('');

  return koreanDigits.replace(/일천/, '천').replace(/일백/, '백').replace(/일십/, '십') || '';
}
