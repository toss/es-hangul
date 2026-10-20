import { DISASSEMBLED_CONSONANTS_BY_CONSONANT, JONGSEONGS } from '@/_internal/constants';
import { JASO_HANGUL_NFD } from '../getChoseong/constants';

/**
 * @name getJongseong
 * @description
 * 단어에서 종성을 추출합니다. (예: `값` -> `'ㅄ'`, `사과` -> `''`)
 * ```typescript
 * getJongseong(
 *   // 종성을 추출할 단어
 *   word: string,
 *   // 옵션 객체로 keepNonHangul 속성을 받을 수 있습니다.
 *   options?: { keepNonHangul?: boolean }
 * ): string
 * ```
 * @example
 * getJongseong('값') // 'ㅄ'
 * getJongseong('사과') // ''
 * getJongseong('값123', { keepNonHangul: true }) // 'ㅄ123'
 */
export function getJongseong(word: string, options: { keepNonHangul?: boolean } = {}) {
  const { keepNonHangul = false } = options;

  if (keepNonHangul) {
    return word
      .normalize('NFD')
      .replace(REMOVE_NFD_CHO_JUNG_REGEX, '')
      .replace(CHOOSE_NFD_JONGSEONG_REGEX, $0 => JONGSEONGS_COMPOSITE[$0.charCodeAt(0) - 0x11a8]);
  }

  return word
    .normalize('NFD')
    .replace(EXTRACT_JONGSEONG_REGEX, '')
    .replace(CHOOSE_NFD_JONGSEONG_REGEX, $0 => JONGSEONGS_COMPOSITE[$0.charCodeAt(0) - 0x11a8]);
}

const EXTRACT_JONGSEONG_REGEX = new RegExp(
  `[^\\u${JASO_HANGUL_NFD.START_JONGSEONG.toString(16)}-\\u${JASO_HANGUL_NFD.END_JONGSEONG.toString(16)}\\s]+`,
  'ug'
);

const CHOOSE_NFD_JONGSEONG_REGEX = new RegExp(
  `[\\u${JASO_HANGUL_NFD.START_JONGSEONG.toString(16)}-\\u${JASO_HANGUL_NFD.END_JONGSEONG.toString(16)}]`,
  'g'
);

const REMOVE_NFD_CHO_JUNG_REGEX = new RegExp(
  `[\\u${JASO_HANGUL_NFD.START_CHOSEONG.toString(16)}-\\u${JASO_HANGUL_NFD.END_CHOSEONG.toString(16)}\\u${JASO_HANGUL_NFD.START_JUNGSEONG.toString(16)}-\\u${JASO_HANGUL_NFD.END_JUNGSEONG.toString(16)}]+`,
  'ug'
);

const JONGSEONGS_COMPOSITE = JONGSEONGS.slice(1).map(
  d => Object.fromEntries(Object.entries(DISASSEMBLED_CONSONANTS_BY_CONSONANT).map(([key, val]) => [val, key]))[d]
);
