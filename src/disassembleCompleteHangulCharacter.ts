import {
  COMPLETE_HANGUL_END_CHARCODE,
  COMPLETE_HANGUL_START_CHARCODE,
  CHOSEONGS,
  JONGSEONGS,
  JUNSEONGS,
  NUMBER_OF_JONGSEONG,
  NUMBER_OF_JUNGSEONG,
} from './constants';

interface ReturnTypeDisassembleCompleteHangulCharacter {
  choseong: (typeof CHOSEONGS)[number];
  jungseong: (typeof JUNSEONGS)[number];
  jongseong: (typeof JONGSEONGS)[number];
}

/**
 * @name disassembleCompleteHangulCharacter
 * @description
 * 완전한 한글 문자열을 초성, 중성, 종성으로 분리합니다.
 *
 * @param {string} letter 분리하고자 하는 완전한 한글 문자열
 *
 * @example
 * disassembleCompleteHangulCharacter('값') // { choseong: 'ㄱ', jungseong: 'ㅏ', jongseong: 'ㅂㅅ' }
 * disassembleCompleteHangulCharacter('리') // { choseong: 'ㄹ', jungseong: 'ㅣ', jongseong: '' }
 * disassembleCompleteHangulCharacter('빚') // { choseong: 'ㅂ', jungseong: 'ㅣ', jongseong: 'ㅈ' }
 * disassembleCompleteHangulCharacter('박') // { choseong: 'ㅂ', jungseong: 'ㅏ', jongseong: 'ㄱ' }
 */

export function disassembleCompleteHangulCharacter(
  letter: string
): ReturnTypeDisassembleCompleteHangulCharacter | undefined {
  const charCode = letter.charCodeAt(0);

  const isCompleteHangul = COMPLETE_HANGUL_START_CHARCODE <= charCode && charCode <= COMPLETE_HANGUL_END_CHARCODE;

  if (!isCompleteHangul) {
    return undefined;
  }

  const hangulCode = charCode - COMPLETE_HANGUL_START_CHARCODE;

  const jongseong = hangulCode % NUMBER_OF_JONGSEONG;
  const jungseong = ((hangulCode - jongseong) / NUMBER_OF_JONGSEONG) % NUMBER_OF_JUNGSEONG;
  const choseong = Math.floor((hangulCode - jongseong) / NUMBER_OF_JONGSEONG / NUMBER_OF_JUNGSEONG);

  return {
    choseong: CHOSEONGS[choseong],
    jungseong: JUNSEONGS[jungseong],
    jongseong: JONGSEONGS[jongseong],
  } as const;
}
