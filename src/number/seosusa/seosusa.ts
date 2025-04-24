import { numberToHangul } from '@/number/numberToHangul';
import { hasProperty } from '@/_internal';
import { SEOSUSA_MAP, SEOSUSA_SPECIAL_CASE_MAP } from './constants';

/**
 * 숫자를 한글 서수사로 변환합니다.
 *
 * @remarks
 * - **서수사**는 순서를 나타내는 단어입니다.
 * - 1부터 99까지의 정수는 순우리말 서수사 문자열로 변환합니다.
 * - 100 이상의 정수는 한자어 서수사 문자열로 변환합니다.
 *
 * @param num - 변환할 숫자
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
 * seosusa(100); // '백째'
 *
 * @see https://es-hangul.slash.page/docs/api/seosusa
 */
export function seosusa(num: number): string {
  if (num <= 0 || !Number.isInteger(num)) {
    throw new Error('유효하지 않은 입력입니다. 1이상의 정수만 지원합니다.');
  }

  if (num >= 1 && num <= 99) {
    return `${getOrdinalWord(num)}째`;
  }

  try {
    return `${numberToHangul(num)}째`;
  } catch (error) {
    throw new Error('유효하지 않은 입력입니다. 1이상의 정수만 지원합니다.');
  }
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
