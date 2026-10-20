import { DISASSEMBLED_VOWELS_BY_VOWEL } from '@/_internal/constants';
import { JASO_HANGUL_NFD } from '../getChoseong/constants';

/**
 * @name getJungseong
 * @description
 * 단어에서 중성을 추출합니다. (예: `사과` -> `'ㅏㅘ'`)
 * ```typescript
 * getJungseong(
 *   // 중성을 추출할 단어
 *   word: string,
 *   // 옵션 객체로 keepNonHangul 속성을 받을 수 있습니다.
 *   options?: { keepNonHangul?: boolean }
 * ): string
 * ```
 * @example
 * getJungseong('사과') // 'ㅏㅘ'
 * getJungseong('띄어 쓰기') // 'ㅢㅓ ㅡㅣ'
 * getJungseong('네이버123', { keepNonHangul: true }) // 'ㅔㅣㅓ123'
 */
export function getJungseong(word: string, options: { keepNonHangul?: boolean } = {}) {
  const { keepNonHangul = false } = options;

  if (keepNonHangul) {
    return word
      .normalize('NFD')
      .replace(REMOVE_NFD_CHO_JONG_REGEX, '')
      .replace(CHOOSE_NFD_JUNGSEONG_REGEX, $0 => JUNGSEONGS_COMPOSITE[$0.charCodeAt(0) - 0x1161]);
  }

  return word
    .normalize('NFD')
    .replace(EXTRACT_JUNGSEONG_REGEX, '')
    .replace(CHOOSE_NFD_JUNGSEONG_REGEX, $0 => JUNGSEONGS_COMPOSITE[$0.charCodeAt(0) - 0x1161]); // NFD -> 합성 중성 문자
}

const EXTRACT_JUNGSEONG_REGEX = new RegExp(
  `[^\\u${JASO_HANGUL_NFD.START_JUNGSEONG.toString(16)}-\\u${JASO_HANGUL_NFD.END_JUNGSEONG.toString(16)}ㅏ-ㅣ\\s]+`,
  'ug'
);
const CHOOSE_NFD_JUNGSEONG_REGEX = new RegExp(
  `[\\u${JASO_HANGUL_NFD.START_JUNGSEONG.toString(16)}-\\u${JASO_HANGUL_NFD.END_JUNGSEONG.toString(16)}]`,
  'g'
);
const REMOVE_NFD_CHO_JONG_REGEX = new RegExp(
  `[\\u${JASO_HANGUL_NFD.START_CHOSEONG.toString(16)}-\\u${JASO_HANGUL_NFD.END_CHOSEONG.toString(16)}\\u${JASO_HANGUL_NFD.START_JONGSEONG.toString(16)}-\\u${JASO_HANGUL_NFD.END_JONGSEONG.toString(16)}]+`,
  'ug'
);

const JUNGSEONGS_COMPOSITE = Object.keys(DISASSEMBLED_VOWELS_BY_VOWEL);
