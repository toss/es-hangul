import { HANGUL_CARDINAL, HANGUL_DIGITS, HANGUL_NUMBERS } from '@/_internal/constants';

export function numberToHangul(input: number, options?: { spacing?: boolean }): string {
  if (input === 0) {
    return '영';
  }

  const koreanParts: string[] = [];
  let remainingDigits = input.toString();
  let placeIndex = 0;

  while (remainingDigits.length > 0) {
    const currentPart = Number(remainingDigits.slice(-4));
    if (currentPart > 0) {
      koreanParts.unshift(`${numberToKoreanUpToThousand(currentPart)}${HANGUL_DIGITS[placeIndex]}`);
    }

    remainingDigits = remainingDigits.slice(0, -4);
    placeIndex++;
  }

  return koreanParts.join(options?.spacing ? ' ' : '');
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

  return koreanDigits.replace(/일(천|백|십)/g, '$1') || '';
}
