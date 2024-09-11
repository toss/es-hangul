import {
  CHOSEONGS,
  COMPLETE_HANGUL_START_CHARCODE,
  DISASSEMBLED_VOWELS_BY_VOWEL,
  JONGSEONGS,
  JUNSEONGS,
} from '@/_internal/constants';
import { canBeChoseong, canBeJongseong, canBeJungseong } from '../canBe';

/**
 * @name combineCharacter
 * @description
 * 인자로 초성, 중성, 종성을 받아 하나의 한글 문자를 반환합니다.
 * ```typescript
 * combineCharacter(
 *   // 초성
 *   choseong: string
 *   // 중성
 *   jungseong: string
 *   // 종성
 *   jongseong: string
 * ): string
 * ```
 * @example
 * combineCharacter('ㄱ', 'ㅏ', 'ㅂㅅ') // '값'
 * combineCharacter('ㅌ', 'ㅗ') // '토'
 */
export function combineCharacter(choseong: string, jungseong: string, jongseong = ''): string {
  if (canBeChoseong(choseong) === false || canBeJungseong(jungseong) === false || canBeJongseong(jongseong) === false) {
    throw new Error(`Invalid hangul Characters: ${choseong}, ${jungseong}, ${jongseong}`);
  }

  const numOfJungseongs = JUNSEONGS.length;
  const numOfJongseongs = JONGSEONGS.length;

  const choseongIndex = CHOSEONGS.indexOf(choseong as (typeof CHOSEONGS)[number]);
  const jungseongIndex = JUNSEONGS.indexOf(jungseong as (typeof JUNSEONGS)[number]);
  const jongseongIndex = JONGSEONGS.indexOf(jongseong as (typeof JONGSEONGS)[number]);

  const choseongOfTargetConsonant = choseongIndex * numOfJungseongs * numOfJongseongs;
  const choseongOfTargetVowel = jungseongIndex * numOfJongseongs;

  const unicode = COMPLETE_HANGUL_START_CHARCODE + choseongOfTargetConsonant + choseongOfTargetVowel + jongseongIndex;

  return String.fromCharCode(unicode);
}

/**
 * @name curriedCombineCharacter
 * @description
 * 인자로 초성, 중성, 종성을 받아 하나의 한글 문자를 반환하는 `combineCharacter` 함수의 커링된 버전입니다.
 * @example
 * const combineMiddleHangulCharacter = curriedCombineCharacter('ㄱ')
 * const combineLastHangulCharacter = combineMiddleHangulCharacter('ㅏ')
 * combineLastHangulCharacter('ㄱ') // '각'
 */
export const curriedCombineCharacter =
  (choseong: string) =>
  (jungseong: string) =>
  (jongseong = '') =>
    combineCharacter(choseong, jungseong, jongseong);

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
