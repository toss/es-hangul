import { HANGUL_CARDINAL, HANGUL_DIGITS, HANGUL_NUMBERS } from '@/_internal/constants';

export function numberToHangul(input: number, options?: { spacing?: boolean }): string {
  if (input === 0) {
    return '영';
  }

  const koreanParts: string[] = [];
  let remainingDigits = input.toString();
  let placeIndex = 0;

  while (remainingDigits.length > 0) {
    const currentPart = remainingDigits.slice(-4);

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
  if (num < 0 || num > 9999) {
    throw new Error('0 이상 9999 이하의 숫자만 입력 가능합니다.');
  }

  const koreanDigits = num
    .toString()
    .split('')
    .reverse()
    .map((digit, index) => (digit === '0' ? '' : HANGUL_NUMBERS[Number(digit)] + HANGUL_CARDINAL[index]))
    .reverse()
    .join('');

  return koreanDigits.replace(/일천/, '천').replace(/일백/, '백').replace(/일십/, '십') || '';

}
