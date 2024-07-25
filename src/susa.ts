import { SUSA_MAP, SUSA_CLASSIFIER_MAP } from './constants';

function validateNumber(num: number): void {
  if (Number.isNaN(num) || !Number.isFinite(num) || num <= 0 || num > 100) {
    throw new Error('지원하지 않는 숫자입니다.');
  }
}

function getClassifier(num: number): string {
  if (num in SUSA_CLASSIFIER_MAP) {
    return SUSA_CLASSIFIER_MAP[num as keyof typeof SUSA_CLASSIFIER_MAP];
  }
  throw new Error('지원하지 않는 숫자입니다.');
}

function getNumberWord(num: number): string {
  if (num === 100) {
    return SUSA_MAP[100];
  }

  const tens = Math.floor(num / 10) * 10;
  const ones = num % 10;
  let result = '';

  if (tens > 0) {
    result += SUSA_MAP[tens as keyof typeof SUSA_MAP];
  }
  if (ones > 0) {
    result += SUSA_MAP[ones as keyof typeof SUSA_MAP];
  }

  return result;
}

export function susa(num: number, classifier: boolean): string {
  validateNumber(num);
  return classifier ? getClassifier(num) : getNumberWord(num);
}
