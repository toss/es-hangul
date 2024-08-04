import {
  COMPLETE_HANGUL_START_CHARCODE,
  DISASSEMBLED_VOWELS_BY_VOWEL,
  CHOSEONGS,
  JONGSEONGS,
  JUNSEONGS,
} from './constants';
import { canBeChoseong, canBeJongseong, canBeJungseong } from './utils';

/**
 * @name combineHangulCharacter
 * @description
 * 인자로 초성, 중성, 종성을 받아 하나의 한글 문자를 반환합니다.
 * ```typescript
 * combineHangulCharacter(
 *   // 초성
 *   choseong: string
 *   // 중성
 *   jungseong: string
 *   // 종성
 *   jongseong: string
 * ): string
 * ```
 * @example
 * combineHangulCharacter('ㄱ', 'ㅏ', 'ㅂㅅ') // '값'
 * combineHangulCharacter('ㅌ', 'ㅗ') // '토'
 */
export function combineHangulCharacter(choseong: string, jungseong: string, jongseong = '') {
  if (canBeChoseong(choseong) === false || canBeJungseong(jungseong) === false || canBeJongseong(jongseong) === false) {
    throw new Error(`Invalid hangul Characters: ${choseong}, ${jungseong}, ${jongseong}`);
  }

  const numOfJungseongs = JUNSEONGS.length;
  const numOfJongseongs = JONGSEONGS.length;

  const choseongIndex = CHOSEONGS.indexOf(choseong);
  const jungseongIndex = JUNSEONGS.indexOf(jungseong);
  const jongseongIndex = JONGSEONGS.indexOf(jongseong);

  const choseongOfTargetConsonant = choseongIndex * numOfJungseongs * numOfJongseongs;
  const choseongOfTargetVowel = jungseongIndex * numOfJongseongs;

  const unicode = COMPLETE_HANGUL_START_CHARCODE + choseongOfTargetConsonant + choseongOfTargetVowel + jongseongIndex;

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
  (choseong: string) =>
  (jungseong: string) =>
  (jongseong = '') =>
    combineHangulCharacter(choseong, jungseong, jongseong);

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
