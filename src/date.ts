import { hasProperty } from './_internal';
import { DATE_DAYS_MAP, DATE_DAYS_ONLY_TENS_MAP } from './constants';

export function days(num: number): string {
  return getNumberWord(num);
}

function validateNumber(num: number): void {
  if (Number.isNaN(num) || num <= 0 || num > 30 || !Number.isInteger(num) || !Number.isFinite(num)) {
    throw new Error('지원하지 않는 숫자입니다.');
  }
}

function getNumberWord(num: number): string {
  validateNumber(num);

  const tens = Math.floor(num / 10) * 10;
  const ones = num % 10;

  if (ones === 0 && hasProperty(DATE_DAYS_ONLY_TENS_MAP, tens)) {
    return DATE_DAYS_ONLY_TENS_MAP[tens];
  }

  const tensWord = hasProperty(DATE_DAYS_MAP, tens) ? DATE_DAYS_MAP[tens] : '';
  const onesWord = hasProperty(DATE_DAYS_MAP, ones) ? DATE_DAYS_MAP[ones] : '';

  return `${tensWord}${onesWord}`;
}
