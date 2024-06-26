import {
  HANGUL_CHARACTERS_BY_FIRST_INDEX,
  HANGUL_CHARACTERS_BY_LAST_INDEX,
  HANGUL_CHARACTERS_BY_MIDDLE_INDEX,
} from './constants';
import { disassembleHangul, disassembleHangulToGroups } from './disassemble';
import { disassembleCompleteHangulCharacter } from './disassembleCompleteHangulCharacter';

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

  const disassembled = disassembleCompleteHangulCharacter(lastChar);
  return disassembled != null && disassembled.last !== '';
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

  if (lastChar == null || hasBatchim(lastChar) === false) {
    return false;
  }

  const disassembled = disassembleHangul(lastChar);
  return disassembled.length === 3;
}

/**
 * @name getChoseong
 * @description
 * 단어에서 초성을 추출합니다. (예: `사과` -> `'ㅅㄱ'`)
 * ```typescript
 * getChoseong(
 *   // 초성을 추출할 단어
 *   word: string
 * ): string
 * ```
 * @example
 * getChoseong('사과') // 'ㅅㄱ'
 * getChoseong('리액트') // 'ㄹㅇㅌ'
 * getChoseong('띄어 쓰기') // 'ㄸㅇ ㅆㄱ'
 */
export function getChoseong(word: string) {
  return disassembleHangulToGroups(word).reduce((choseong, [consonant]) => {
    return `${choseong}${consonant}`;
  }, '');
}

/**
 * @name getFirstConsonants
 * @deprecated getChoseong을 사용해 주세요.
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
 * @name canBeChoseong
 * @description
 * 인자로 받은 문자가 초성으로 위치할 수 있는 문자인지 검사합니다.
 * ```typescript
 * canBeChoseong(
 *   // 대상 문자
 *   character: string
 * ): boolean
 * ```
 * @example
 * canBeChoseong('ㄱ') // true
 * canBeChoseong('ㅃ') // true
 * canBeChoseong('ㄱㅅ') // false
 * canBeChoseong('ㅏ') // false
 * canBeChoseong('가') // false
 */
export function canBeChoseong(character: string): character is (typeof HANGUL_CHARACTERS_BY_FIRST_INDEX)[number] {
  return hasValueInReadOnlyStringList(HANGUL_CHARACTERS_BY_FIRST_INDEX, character);
}

/**
 * @name canBeJungseong
 * @description
 * 인자로 받은 문자가 중성으로 위치할 수 있는 문자인지 검사합니다.
 * ```typescript
 * canBeJungseong(
 *   // 대상 문자
 *   character: string
 * ): boolean
 * ```
 * @example
 * canBeJungseong('ㅏ') // true
 * canBeJungseong('ㅗㅏ') // true
 * canBeJungseong('ㅏㅗ') // false
 * canBeJungseong('ㄱ') // false
 * canBeJungseong('ㄱㅅ') // false
 * canBeJungseong('가') // false
 */
export function canBeJungseong(character: string): character is (typeof HANGUL_CHARACTERS_BY_MIDDLE_INDEX)[number] {
  return hasValueInReadOnlyStringList(HANGUL_CHARACTERS_BY_MIDDLE_INDEX, character);
}

/**
 * @name canBeJongseong
 * @description
 * 인자로 받은 문자가 종성으로 위치할 수 있는 문자인지 검사합니다.
 * ```typescript
 * canBeJongseong(
 *   // 대상 문자
 *   character: string
 * ): boolean
 * ```
 * @example
 * canBeJongseong('ㄱ') // true
 * canBeJongseong('ㄱㅅ') // true
 * canBeJongseong('ㅎㄹ') // false
 * canBeJongseong('가') // false
 * canBeJongseong('ㅏ') // false
 * canBeJongseong('ㅗㅏ') // false
 */
export function canBeJongseong(character: string): character is (typeof HANGUL_CHARACTERS_BY_LAST_INDEX)[number] {
  return hasValueInReadOnlyStringList(HANGUL_CHARACTERS_BY_LAST_INDEX, character);
}

export function hasValueInReadOnlyStringList<T extends string>(list: readonly T[], value: string): value is T {
  return list.some(item => item === value);
}

export function hasProperty<T extends object, K extends PropertyKey>(obj: T, key: K): key is K & keyof T {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
