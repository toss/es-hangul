import { JASO_HANGUL_NFD } from '../getChoseong/constants';
import { COMPAT_JONGSEONGS } from '@/_internal/constants';

/**
 * @name getJongseong
 * @description
 * 단어에서 종성을 추출합니다. (예: `한글` -> `'ㄴㄹ'`)
 * ```typescript
 * getJongseong(
 *   // 종성을 추출할 단어
 *   word: string
 * ): string
 * ```
 * @example
 * getJongseong('한글') // 'ㄴㄹ'
 * getJongseong('값') // 'ㅄ'
 */
export function getJongseong(word: string) {
  return word
    .normalize('NFD')
    .replace(EXTRACT_JONGSEONG_REGEX, '') // NFD ㄱ-ㅎ, NFC ㄱ-ㅎ 외 문자 삭제
    .replace(CHOOSE_NFD_JONGSEONG_REGEX, $0 => COMPAT_JONGSEONGS[$0.charCodeAt(0) - JASO_HANGUL_NFD.START_JONGSEONG]); // NFD to NFC (compat jamo)
}

const EXTRACT_JONGSEONG_REGEX = new RegExp(
  `[^\\u${JASO_HANGUL_NFD.START_JONGSEONG.toString(16)}-\\u${JASO_HANGUL_NFD.END_JONGSEONG.toString(16)}ㄱ-ㅎ\\s]+`,
  'ug'
);
const CHOOSE_NFD_JONGSEONG_REGEX = new RegExp(
  `[\\u${JASO_HANGUL_NFD.START_JONGSEONG.toString(16)}-\\u${JASO_HANGUL_NFD.END_JONGSEONG.toString(16)}]`,
  'g'
);


