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
 *   str: string
 * ): boolean
 * ```
 * @example
 * hasBatchim('값') // true
 * hasBatchim('토') // false
 */
export function hasBatchim(str: string) {
  const lastChar = str[str.length - 1];

  if (lastChar == null) {
    return false;
  }
  const charCode = lastChar.charCodeAt(0);
  const isCompleteHangul = COMPLETE_HANGUL_START_CHARCODE <= charCode && charCode <= COMPLETE_HANGUL_END_CHARCODE;

  if (!isCompleteHangul) {
    return false;
  }

  return (charCode - COMPLETE_HANGUL_START_CHARCODE) % NUMBER_OF_JONGSEONG > 0;
}

/**
 * @name hasSingleBatchim
 * @description
 * 한글 문자열의 마지막 글자가 홑받침이 있는지 확인합니다.
 * ```typescript
 * hasSingleBatchim(
 *   // 글자에 받침이 있는지 확인하고 싶은 문자열
 *   str: string
 * ): boolean
 * ```
 * @example
 * hasSingleBatchim('갑') // true
 * hasSingleBatchim('값') // false
 * hasSingleBatchim('토') // false
 */
export function hasSingleBatchim(str: string) {
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
  return HANGUL_CHARACTERS_BY_LAST_INDEX[batchimCode].length === 1;
}

export function hasValueInReadOnlyStringList<T extends string>(list: readonly T[], value: string): value is T {
  return list.some(item => item === value);
}

export function hasProperty<T extends object, K extends PropertyKey>(obj: T, key: K): key is K & keyof T {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
