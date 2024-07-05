import {
  COMPLETE_HANGUL_START_CHAR_CODE,
  DISASSEMBLED_VOWELS_BY_VOWEL,
  HANGUL_CHARACTERS_BY_FIRST_INDEX,
  HANGUL_CHARACTERS_BY_LAST_INDEX,
  HANGUL_CHARACTERS_BY_MIDDLE_INDEX,
} from './constants';
import { canBeChosung, canBeJongsung, canBeJungsung } from './utils';

/**
 * @name combineHangulCharacter
 * @description
 * 인자로 초성, 중성, 종성을 받아 하나의 한글 문자를 반환합니다.
 * ```typescript
 * combineHangulCharacter(
 *   // 초성
 *   firstCharacter: string
 *   // 중성
 *   middleCharacter: string
 *   // 종성
 *   lastCharacter: string
 * ): string
 * ```
 * @example
 * combineHangulCharacter('ㄱ', 'ㅏ', 'ㅂㅅ') // '값'
 * combineHangulCharacter('ㅌ', 'ㅗ') // '토'
 */
export function combineHangulCharacter(firstCharacter: string, middleCharacter: string, lastCharacter = '') {
  if (
    canBeChosung(firstCharacter) === false ||
    canBeJungsung(middleCharacter) === false ||
    canBeJongsung(lastCharacter) === false
  ) {
    throw new Error(`Invalid hangul Characters: ${firstCharacter}, ${middleCharacter}, ${lastCharacter}`);
  }

  const numOfMiddleCharacters = HANGUL_CHARACTERS_BY_MIDDLE_INDEX.length;
  const numOfLastCharacters = HANGUL_CHARACTERS_BY_LAST_INDEX.length;

  const firstCharacterIndex = HANGUL_CHARACTERS_BY_FIRST_INDEX.indexOf(firstCharacter);
  const middleCharacterIndex = HANGUL_CHARACTERS_BY_MIDDLE_INDEX.indexOf(middleCharacter);
  const lastCharacterIndex = HANGUL_CHARACTERS_BY_LAST_INDEX.indexOf(lastCharacter);

  const firstIndexOfTargetConsonant = firstCharacterIndex * numOfMiddleCharacters * numOfLastCharacters;
  const firstIndexOfTargetVowel = middleCharacterIndex * numOfLastCharacters;

  const unicode =
    COMPLETE_HANGUL_START_CHAR_CODE + firstIndexOfTargetConsonant + firstIndexOfTargetVowel + lastCharacterIndex;

  return String.fromCharCode(unicode);
}

/**
 * @name curriedCombineHangulCharacter
 * @description
 * 인자로 초성, 중성, 종성을 받아 하나의 한글 문자를 반환하는 `combineHangulCharacter` 함수의 커링된 버전입니다.
 * @example
 * const combineMiddleHangulCharacter = curriedCombineHangulCharacter('ㄱ')
 * const combineLastHangulCharacter = combineMiddleHangulCharacter('ㅏ')
 * combineLastHangulCharacter('ㄱ') // '각'
 */
export const curriedCombineHangulCharacter =
  (firstCharacter: string) =>
  (middleCharacter: string) =>
  (lastCharacter = '') =>
    combineHangulCharacter(firstCharacter, middleCharacter, lastCharacter);

/**
 * @name combineVowels
 * @description
 * 인자로 두 개의 모음을 받아 합성하여 겹모음을 생성합니다. 만약 올바른 한글 규칙으로 합성할 수 없는 모음들이라면 단순 Join합니다.
 * ```typescript
 * combineVowels(
 *   // 첫 번째 모음
 *   vowel1: string
 *   // 두 번째 모음
 *   vowel2: string
 * ): string
 * ```
 * @example
 * combineVowels('ㅗ', 'ㅏ') // 'ㅘ'
 * combineVowels('ㅗ', 'ㅐ') // 'ㅙ'
 * combineVowels('ㅗ', 'ㅛ') // 'ㅗㅛ'
 */
export const combineVowels = (vowel1: string, vowel2: string) =>
  Object.entries(DISASSEMBLED_VOWELS_BY_VOWEL).find(([, value]) => value === `${vowel1}${vowel2}`)?.[0] ??
  `${vowel1}${vowel2}`;
