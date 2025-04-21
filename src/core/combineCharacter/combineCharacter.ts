import { CHOSEONGS, COMPLETE_HANGUL_START_CHARCODE, JONGSEONGS, JUNSEONGS } from '@/_internal/constants';
import { canBeChoseong } from '@/core/canBeChoseong';
import { canBeJongseong } from '@/core/canBeJongseong';
import { canBeJungseong } from '@/core/canBeJungseong';

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
export function combineCharacter(choseong: string, jungseong: string, jongseong = '') {
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
