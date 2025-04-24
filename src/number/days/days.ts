import { hasProperty } from '@/_internal';
import { DAYS_MAP, DAYS_ONLY_TENS_MAP } from './constants';

export function days(num: number): string {
  return getNumberWord(num);
}

function getNumberWord(num: number): string {
  validateNumber(num);

  const tens = Math.floor(num / 10) * 10;
  const ones = num % 10;

  if (ones === 0 && hasProperty(DAYS_ONLY_TENS_MAP, tens)) {
    return DAYS_ONLY_TENS_MAP[tens];
  }

  const tensWord = hasProperty(DAYS_MAP, tens) ? DAYS_MAP[tens] : '';
  const onesWord = DAYS_MAP[ones as keyof typeof DAYS_MAP];

  return `${tensWord}${onesWord}`;
}

function validateNumber(num: number): void {
  if (Number.isNaN(num) || num <= 0 || num > 30 || !Number.isInteger(num) || !Number.isFinite(num)) {
    throw new Error('지원하지 않는 숫자입니다.');
  }
}
