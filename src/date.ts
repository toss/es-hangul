import { hasProperty } from './_internal';
import { DATE_DAYS_MAP } from './constants';

export function days(num: number): string {
  validateNumber(num);
  return getNumberWord(num);
}

function validateNumber(num: number): void {
  if (Number.isNaN(num) || num <= 0 || num > 30 || !Number.isInteger(num) || !Number.isFinite(num)) {
    throw new Error('지원하지 않는 숫자입니다.');
  }
}

function getNumberWord(num: number): string {
  const tens = Math.floor(num / 10) * 10;
  const ones = num % 10;

  const tensWord = hasProperty(DATE_DAYS_MAP, tens) ? DATE_DAYS_MAP[tens] : '';
  const onesWord = hasProperty(DATE_DAYS_MAP, ones) ? DATE_DAYS_MAP[ones] : '';

  return `${tensWord}${onesWord}`;
}
