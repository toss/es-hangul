import {
  COMPLETE_HANGUL_END_CHARCODE,
  COMPLETE_HANGUL_START_CHARCODE,
  HANGUL_CHARACTERS_BY_FIRST_INDEX,
  HANGUL_CHARACTERS_BY_LAST_INDEX,
  HANGUL_CHARACTERS_BY_MIDDLE_INDEX,
  NUMBER_OF_JONGSEONG,
  NUMBER_OF_JUNGSEONG,
} from './constants';

interface ReturnTypedisassembleCompleteCharacter {
  first: (typeof HANGUL_CHARACTERS_BY_FIRST_INDEX)[number];
  middle: (typeof HANGUL_CHARACTERS_BY_MIDDLE_INDEX)[number];
  last: (typeof HANGUL_CHARACTERS_BY_LAST_INDEX)[number];
}

/**
 * @name disassembleCompleteCharacter
 * @description
 * 완전한 한글 문자열을 초성, 중성, 종성으로 분리합니다.
 *
 * @param {string} letter 분리하고자 하는 완전한 한글 문자열
 *
 * @example
 * disassembleCompleteCharacter('값') // { first: 'ㄱ', middle: 'ㅏ', last: 'ㅂㅅ' }
 * disassembleCompleteCharacter('리') // { first: 'ㄹ', middle: 'ㅣ', last: '' }
 * disassembleCompleteCharacter('빚') // { first: 'ㅂ', middle: 'ㅣ', last: 'ㅈ' }
 * disassembleCompleteCharacter('박') // { first: 'ㅂ', middle: 'ㅏ', last: 'ㄱ' }
 */

export function disassembleCompleteCharacter(letter: string): ReturnTypedisassembleCompleteCharacter | undefined {
  const charCode = letter.charCodeAt(0);

  const isCompleteHangul = COMPLETE_HANGUL_START_CHARCODE <= charCode && charCode <= COMPLETE_HANGUL_END_CHARCODE;

  if (!isCompleteHangul) {
    return undefined;
  }

  const hangulCode = charCode - COMPLETE_HANGUL_START_CHARCODE;

  const lastIndex = hangulCode % NUMBER_OF_JONGSEONG;
  const middleIndex = ((hangulCode - lastIndex) / NUMBER_OF_JONGSEONG) % NUMBER_OF_JUNGSEONG;
  const firstIndex = Math.floor((hangulCode - lastIndex) / NUMBER_OF_JONGSEONG / NUMBER_OF_JUNGSEONG);

  return {
    first: HANGUL_CHARACTERS_BY_FIRST_INDEX[firstIndex],
    middle: HANGUL_CHARACTERS_BY_MIDDLE_INDEX[middleIndex],
    last: HANGUL_CHARACTERS_BY_LAST_INDEX[lastIndex],
  } as const;
}
