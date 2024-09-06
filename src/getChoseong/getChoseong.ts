import { CHOSEONGS } from '@/_internal/constants';
import { JASO_HANGUL_NFD } from './constants';

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
 * getChoseong('띄어 쓰기') // 'ㄸㅇ ㅆㄱ'
 */
export function getChoseong(word: string) {
  return word
    .normalize('NFD')
    .replace(EXTRACT_CHOSEONG_REGEX, '') // NFD ㄱ-ㅎ, NFC ㄱ-ㅎ 외 문자 삭제
    .replace(CHOOSE_NFD_CHOSEONG_REGEX, $0 => CHOSEONGS[$0.charCodeAt(0) - 0x1100]); // NFD to NFC
}

const EXTRACT_CHOSEONG_REGEX = new RegExp(
  `[^\\u${JASO_HANGUL_NFD.START_CHOSEONG.toString(16)}-\\u${JASO_HANGUL_NFD.END_CHOSEONG.toString(16)}ㄱ-ㅎ\\s]+`,
  'ug'
);
const CHOOSE_NFD_CHOSEONG_REGEX = new RegExp(
  `[\\u${JASO_HANGUL_NFD.START_CHOSEONG.toString(16)}-\\u${JASO_HANGUL_NFD.END_CHOSEONG.toString(16)}]`,
  'g'
);
