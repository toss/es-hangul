import { HANGUL_DIGITS } from '@/_internal/constants';

export function numberToHangulMixed(input: number, options?: { spacing?: boolean }): string {
  if (!Number.isFinite(input) || Number.isNaN(input) || !Number.isInteger(input) || input < 0) {
    throw new Error('유효한 0 이상의 정수를 입력해주세요.');
  }

  if (input === 0) {
    return '0';
  }

  const koreanParts: string[] = [];
  let remainingDigits = input.toString();
  let placeIndex = 0;

  while (remainingDigits.length > 0) {
    const currentPart = remainingDigits.slice(-4);

    if (Number(currentPart) > 0) {
      koreanParts.unshift(`${Number(currentPart).toLocaleString()}${HANGUL_DIGITS[placeIndex]}`);
    }

    koreanParts.unshift('');

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
