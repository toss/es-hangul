import { HANGUL_CARDINAL, HANGUL_DIGITS, HANGUL_NUMBERS } from '@/_internal/constants';

export function numberToHangul(input: number, options?: { spacing?: boolean }): string {
  if (!Number.isFinite(input) || Number.isNaN(input) || !Number.isInteger(input) || input < 0) {
    throw new Error('유효한 0 이상의 정수를 입력해주세요.');
  }

  if (input === 0) {
    return '영';
  }

  const koreanParts: string[] = [];
  let remainingDigits = input.toString();
  let placeIndex = 0;

  while (remainingDigits.length > 0) {
    const currentPart = remainingDigits.slice(-4);
    console.log('currentPart: ', currentPart);

    koreanParts.unshift(`${numberToKoreanUpToThousand(Number(currentPart))}${HANGUL_DIGITS[placeIndex]}`);

    remainingDigits = remainingDigits.slice(0, -4);
    placeIndex++;
  }

  if (options?.spacing) {
    return koreanParts
      .filter(part => part !== '')
      .join(' ')
      .trim();
  }

  return koreanParts.join('');
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
