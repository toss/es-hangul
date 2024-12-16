import { hasProperty } from '../_internal';
import { SEOSUSA_MAP, SEOSUSA_SPECIAL_CASE_MAP } from './constants';

/**
 * 숫자를 순 우리말 서수사로 변환합니다.
 *
 * @remarks
 * - **서수사**는 순서를 나타내는 우리말 단어입니다. 이 함수에서는 첫째, 둘째, 셋째와 같은 고유어 계통 단어를 다룹니다.
 * - 1부터 99까지의 정수를 서수사 문자열로 변환합니다.
 *
 * @param num - 변환할 숫자 (1-99)
 * @return 변환된 서수사 문자열
 * @throws {Error} 지원하지 않는 숫자인 경우
 *
 * @example
 * seosusa(1);  // '첫째'
 * seosusa(2);  // '둘째'
 * seosusa(3);  // '셋째'
 * seosusa(10); // '열째'
 * seosusa(11); // '열한째'
 * seosusa(12); // '열두째'
 * seosusa(13); // '열셋째'
 * seosusa(20); // '스무째'
 * seosusa(21); // '스물한째'
 * seosusa(30); // '서른째'
 * seosusa(40); // '마흔째'
 * seosusa(99); // '아흔아홉째'
 *
 * @see https://es-hangul.slash.page/docs/api/seosusa
 */
export function seosusa(num: number): string {
  if (!isValidNumber(num)) {
    throw new Error('유효하지 않은 입력입니다. 1부터 99까지의 정수만 지원합니다.');
  }
  return `${getOrdinalWord(num)}째`;
}

/**
 * 유효한 숫자 범위인지 확인합니다.
 * 1부터 99까지의 숫자만 유효합니다.
 */
function isValidNumber(num: number): boolean {
  return num >= 1 && num <= 99 && Number.isInteger(num);
}
function getOrdinalWord(num: number): string {
  if (hasProperty(SEOSUSA_SPECIAL_CASE_MAP, num)) {
    return SEOSUSA_SPECIAL_CASE_MAP[num];
  }

  const tens = Math.floor(num / 10) * 10;
  const ones = num % 10;

  const tensWord = hasProperty(SEOSUSA_MAP, tens) ? SEOSUSA_MAP[tens] : '';
  const onesWord = hasProperty(SEOSUSA_MAP, ones) ? SEOSUSA_MAP[ones] : '';

  return `${tensWord}${onesWord}`;
}
