import {
  COMPLETE_HANGUL_START_CHARCODE,
  COMPLETE_HANGUL_END_CHARCODE,
  HANGUL_CHARACTERS_BY_FIRST_INDEX,
  HANGUL_CHARACTERS_BY_LAST_INDEX,
  HANGUL_CHARACTERS_BY_MIDDLE_INDEX,
  NUMBER_OF_JONGSUNG,
} from './constants';
import { disassembleHangulToGroups } from './disassemble';

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

  return (charCode - COMPLETE_HANGUL_START_CHARCODE) % NUMBER_OF_JONGSUNG > 0;
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

  const batchimCode = (charCode - COMPLETE_HANGUL_START_CHARCODE) % NUMBER_OF_JONGSUNG;
  return HANGUL_CHARACTERS_BY_LAST_INDEX[batchimCode].length === 1;
}

/**
 * @name getChosung
 * @description
 * 단어에서 초성을 추출합니다. (예: `사과` -> `'ㅅㄱ'`)
 * ```typescript
 * getChosung(
 *   // 초성을 추출할 단어
 *   word: string
 * ): string
 * ```
 * @example
 * getChosung('사과') // 'ㅅㄱ'
 * getChosung('리액트') // 'ㄹㅇㅌ'
 * getChosung('띄어 쓰기') // 'ㄸㅇ ㅆㄱ'
 */
export function getChosung(word: string) {
  return word.normalize('NFD')
    .replace(/[^\u1100-\u1112\u3130-\u314e\s]+/ug, '') // NFD ㄱ-ㅎ, NFC ㄱ-ㅎ 외 문자 삭제
    .replace(/[\u1100-\u1112]/g, $0 => HANGUL_CHARACTERS_BY_FIRST_INDEX[$0.charCodeAt(0) - 0x1100]); // NFD to NFC
}

/**
 * @name getFirstConsonants
 * @deprecated getChosung을 사용해 주세요.
 * @description
 * 단어에서 초성을 추출합니다. (예: `사과` -> `'ㅅㄱ'`)
 * ```typescript
 * getFirstConsonants(
 *   // 초성을 추출할 단어
 *   word: string
 * ): string
 * ```
 * @example
 * getFirstConsonants('사과') // 'ㅅㄱ'
 * getFirstConsonants('리액트') // 'ㄹㅇㅌ'
 * getFirstConsonants('띄어 쓰기') // 'ㄸㅇ ㅆㄱ'
 */
export function getFirstConsonants(word: string) {
  return disassembleHangulToGroups(word).reduce((firstConsonants, [consonant]) => {
    return `${firstConsonants}${consonant}`;
  }, '');
}

/**
 * @name canBeChosung
 * @description
 * 인자로 받은 문자가 초성으로 위치할 수 있는 문자인지 검사합니다.
 * ```typescript
 * canBeChosung(
 *   // 대상 문자
 *   character: string
 * ): boolean
 * ```
 * @example
 * canBeChosung('ㄱ') // true
 * canBeChosung('ㅃ') // true
 * canBeChosung('ㄱㅅ') // false
 * canBeChosung('ㅏ') // false
 * canBeChosung('가') // false
 */
export function canBeChosung(character: string): character is (typeof HANGUL_CHARACTERS_BY_FIRST_INDEX)[number] {
  return hasValueInReadOnlyStringList(HANGUL_CHARACTERS_BY_FIRST_INDEX, character);
}

/**
 * @name canBeJungsung
 * @description
 * 인자로 받은 문자가 중성으로 위치할 수 있는 문자인지 검사합니다.
 * ```typescript
 * canBeJungsung(
 *   // 대상 문자
 *   character: string
 * ): boolean
 * ```
 * @example
 * canBeJungsung('ㅏ') // true
 * canBeJungsung('ㅗㅏ') // true
 * canBeJungsung('ㅏㅗ') // false
 * canBeJungsung('ㄱ') // false
 * canBeJungsung('ㄱㅅ') // false
 * canBeJungsung('가') // false
 */
export function canBeJungsung(character: string): character is (typeof HANGUL_CHARACTERS_BY_MIDDLE_INDEX)[number] {
  return hasValueInReadOnlyStringList(HANGUL_CHARACTERS_BY_MIDDLE_INDEX, character);
}

/**
 * @name canBeJongsung
 * @description
 * 인자로 받은 문자가 종성으로 위치할 수 있는 문자인지 검사합니다.
 * ```typescript
 * canBeJongsung(
 *   // 대상 문자
 *   character: string
 * ): boolean
 * ```
 * @example
 * canBeJongsung('ㄱ') // true
 * canBeJongsung('ㄱㅅ') // true
 * canBeJongsung('ㅎㄹ') // false
 * canBeJongsung('가') // false
 * canBeJongsung('ㅏ') // false
 * canBeJongsung('ㅗㅏ') // false
 */
export function canBeJongsung(character: string): character is (typeof HANGUL_CHARACTERS_BY_LAST_INDEX)[number] {
  return hasValueInReadOnlyStringList(HANGUL_CHARACTERS_BY_LAST_INDEX, character);
}

export function hasValueInReadOnlyStringList<T extends string>(list: readonly T[], value: string): value is T {
  return list.some(item => item === value);
}

export function hasProperty<T extends object, K extends PropertyKey>(obj: T, key: K): key is K & keyof T {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
