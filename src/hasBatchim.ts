import {
  COMPLETE_HANGUL_END_CHARCODE,
  COMPLETE_HANGUL_START_CHARCODE,
  HANGUL_CHARACTERS_BY_LAST_INDEX,
  NUMBER_OF_JONGSEONG,
} from './constants';

/**
 * @name hasBatchim
 * @description
 * 한글 문자열의 마지막 글자가 받침이 있는지 확인합니다.
 * ```typescript
 * hasBatchim(
 *   // 글자에 받침이 있는지 확인하고 싶은 문자열
 *   str: string,
 *   // 옵션 객체로 홑받침 여부를 확인
 *   options?: { single?: boolean }
 * ): boolean
 * ```
 * @example
 * hasBatchim('값') // true
 * hasBatchim('토') // false
 * hasBatchim('갑', { single: true }) // true
 * hasBatchim('값', { single: true }) // false
 * hasBatchim('토', { single: true }) // false
 */
export function hasBatchim(str: string, options?: { single?: boolean }) {
  const lastChar = str[str.length - 1];

  if (lastChar == null) {
    return false;
  }
  const charCode = lastChar.charCodeAt(0);
  const isCompleteHangul = COMPLETE_HANGUL_START_CHARCODE <= charCode && charCode <= COMPLETE_HANGUL_END_CHARCODE;

  if (!isCompleteHangul) {
    return false;
  }

  const batchimCode = (charCode - COMPLETE_HANGUL_START_CHARCODE) % NUMBER_OF_JONGSEONG;

  if (options?.single) {
    return HANGUL_CHARACTERS_BY_LAST_INDEX[batchimCode].length === 1;
  }

  return batchimCode > 0;
}
