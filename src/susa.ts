import { SUSA_MAP, SUSA_CLASSIFIER_MAP } from './constants';
import { hasProperty } from './utils';

export function susa(num: number, classifier?: boolean): string {
  validateNumber(num);
  return classifier ? getClassifierWord(num) : getNumberWord(num);
}

function getClassifierWord(num: number): string {
  if (num === 20) {
    return SUSA_CLASSIFIER_MAP[num];
  }

  const tens = Math.floor(num / 10) * 10;
  const ones = num % 10;

  let classifier = '';

  if (hasProperty(SUSA_MAP, tens)) {
    classifier += SUSA_MAP[tens];
  }

  if (hasProperty(SUSA_CLASSIFIER_MAP, ones)) {
    classifier += SUSA_CLASSIFIER_MAP[ones];
    return classifier;
  }

  if (hasProperty(SUSA_MAP, ones)) {
    classifier += SUSA_MAP[ones];
  }

  return classifier;
}

function validateNumber(num: number): void {
  if (Number.isNaN(num) || !Number.isFinite(num) || num <= 0 || num > 100) {
    throw new Error('지원하지 않는 숫자입니다.');
  }
}

function getNumberWord(num: number): string {
  if (num === 100) {
    return SUSA_MAP[100];
  }

  const tens = Math.floor(num / 10) * 10;
  const ones = num % 10;
  let result = '';

  if (tens > 0 && hasProperty(SUSA_MAP, tens)) {
    result += SUSA_MAP[tens];
  }
  if (ones > 0 && hasProperty(SUSA_MAP, ones)) {
    result += SUSA_MAP[ones];
  }

  return result;
}
