import { JUNGSEONGS } from '@/_internal/constants';
import { JASO_HANGUL_NFD } from '../getChoseong/constants';

/**
 * @name getJungseong
 * @description
 * 단어에서 중성을 추출합니다. (예: `사과` -> `'ㅏㅘ'`)
 * ```typescript
 * getJungseong(
 *   // 중성을 추출할 단어
 *   word: string
 * ): string
 * ```
 * @example
 * getJungseong('사과') // 'ㅏㅘ'
 * getJungseong('하늘') // 'ㅏㅡ'
 */
export function getJungseong(word: string) {
  return word
    .normalize('NFD')
    .replace(EXTRACT_JUNGSEONG_REGEX, '') // NFD ᅡ-ᅵ, NFC ㅏ-ㅣ 외 문자 삭제
    .replace(CHOOSE_NFD_JUNGSEONG_REGEX, $0 => JUNGSEONGS[$0.charCodeAt(0) - JASO_HANGUL_NFD.START_JUNGSEONG]); // NFD to NFC
}

const EXTRACT_JUNGSEONG_REGEX = new RegExp(
  `[^\\u${JASO_HANGUL_NFD.START_JUNGSEONG.toString(16)}-\\u${JASO_HANGUL_NFD.END_JUNGSEONG.toString(16)}ㅏ-ㅣ\\s]+`,
  'ug'
);
const CHOOSE_NFD_JUNGSEONG_REGEX = new RegExp(
  `[\\u${JASO_HANGUL_NFD.START_JUNGSEONG.toString(16)}-\\u${JASO_HANGUL_NFD.END_JUNGSEONG.toString(16)}]`,
  'g'
);


