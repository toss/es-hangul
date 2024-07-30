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

  const tensWord = hasProperty(SUSA_MAP, tens) ? SUSA_MAP[tens] : '';

  if (ones === 0) {
    return tensWord;
  }

  if (hasProperty(SUSA_CLASSIFIER_MAP, ones)) {
    const onesWord = SUSA_CLASSIFIER_MAP[ones];

    return `${tensWord}${onesWord}`;
  }

  if (hasProperty(SUSA_MAP, ones)) {
    const onesWord = SUSA_MAP[ones];

    return `${tensWord}${onesWord}`;
  }

  // `susa`에서` `validateNumber` 하기 때문에 도달할 수 없는 분기입니다. 타입 추론을 위해 에러를 던져줍니다.
  throw new Error('지원하지 않는 숫자입니다.');
}

function validateNumber(num: number): void {
  if (Number.isNaN(num) || num <= 0 || num > 100 || !Number.isInteger(num) || !Number.isFinite(num)) {
    throw new Error('지원하지 않는 숫자입니다.');
  }
}

function getNumberWord(num: number): string {
  if (num === 100) {
    return SUSA_MAP[100];
  }

  const tens = Math.floor(num / 10) * 10;
  const ones = num % 10;

  const tensWord = hasProperty(SUSA_MAP, tens) ? SUSA_MAP[tens] : '';
  const onesWord = hasProperty(SUSA_MAP, ones) ? SUSA_MAP[ones] : '';

  return `${tensWord}${onesWord}`;
}
