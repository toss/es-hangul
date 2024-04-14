import {
  COMPLETE_HANGUL_END_CHARCODE,
  COMPLETE_HANGUL_START_CHARCODE,
  HANGUL_CHARACTERS_BY_FIRST_INDEX,
  HANGUL_CHARACTERS_BY_LAST_INDEX,
  HANGUL_CHARACTERS_BY_MIDDLE_INDEX,
} from './constants';
import { disassembleHangulToGroups } from './disassemble';
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
  const lastChar = str[str.length - 1]!;
  const disassembled = disassembleCompleteHangulCharacter(lastChar);
  return disassembled != null && disassembled.last !== '';
}

/**
 * @name getFirstConsonants
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
export function canBeChosung(character: string) {
  return HANGUL_CHARACTERS_BY_FIRST_INDEX.includes(character);
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
 * canBeChosung('ㅏ') // true
 * canBeChosung('ㅗㅏ') // true
 * canBeChosung('ㅏㅗ') // false
 * canBeChosung('ㄱ') // false
 * canBeChosung('ㄱㅅ') // false
 * canBeChosung('가') // false
 */
export function canBeJungsung(character: string) {
  return HANGUL_CHARACTERS_BY_MIDDLE_INDEX.includes(character);
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
 * canBeChosung('ㄱ') // true
 * canBeChosung('ㄱㅅ') // true
 * canBeChosung('ㅎㄹ') // false
 * canBeChosung('가') // false
 * canBeChosung('ㅏ') // false
 * canBeChosung('ㅗㅏ') // false
 */
export function canBeJongsung(character: string) {
  return HANGUL_CHARACTERS_BY_LAST_INDEX.includes(character);
}
