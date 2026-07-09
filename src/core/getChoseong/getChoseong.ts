import { CHOSEONGS } from '@/_internal/constants';
import { JASO_HANGUL_NFD } from './constants';

/**
 * @name getChoseong
 * @description
 * 단어에서 초성을 추출합니다. (예: `사과` -> `'ㅅㄱ'`)
 *
 * `keepNonHangul`이 `true`이면 한글 외 문자(숫자, 영문 등)를 그대로 둡니다.
 * 기본값은 `false`로, 초성·호환 자모·공백만 남기고 나머지는 제거합니다.
 *
 * @example
 * getChoseong('사과') // 'ㅅㄱ'
 * getChoseong('띄어 쓰기') // 'ㄸㅇ ㅆㄱ'
 * getChoseong('네이버123', { keepNonHangul: true }) // 'ㄴㅇㅂ123'
 */
export function getChoseong(word: string, options: { keepNonHangul?: boolean } = {}) {
  const { keepNonHangul = false } = options;

  if (keepNonHangul) {
    return word
      .normalize('NFD')
      .replace(REMOVE_NFD_JUNG_JONG_REGEX, '')
      .replace(CHOOSE_NFD_CHOSEONG_REGEX, $0 => CHOSEONGS[$0.charCodeAt(0) - 0x1100]);
  }

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
const REMOVE_NFD_JUNG_JONG_REGEX = new RegExp(
  `[\\u${JASO_HANGUL_NFD.START_JUNGSEONG.toString(16)}-\\u${JASO_HANGUL_NFD.END_JUNGSEONG.toString(16)}\\u${JASO_HANGUL_NFD.START_JONGSEONG.toString(16)}-\\u${JASO_HANGUL_NFD.END_JONGSEONG.toString(16)}]+`,
  'ug'
);
