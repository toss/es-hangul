import {
  CHOSEONGS,
  COMPLETE_HANGUL_END_CHARCODE,
  COMPLETE_HANGUL_START_CHARCODE,
  JONGSEONGS,
  JUNSEONGS,
  NUMBER_OF_JONGSEONG,
  NUMBER_OF_JUNGSEONG,
} from '@/_internal/constants';

interface ReturnTypeDisassembleCompleteCharacter {
  choseong: (typeof CHOSEONGS)[number];
  jungseong: (typeof JUNSEONGS)[number];
  jongseong: (typeof JONGSEONGS)[number];
}

/**
 * @name disassembleCompleteCharacter
 * @description
 * 완전한 한글 문자열을 초성, 중성, 종성으로 분리합니다.
 *
 * @param {string} letter 분리하고자 하는 완전한 한글 문자열
 *
 * @example
 * disassembleCompleteCharacter('값') // { choseong: 'ㄱ', jungseong: 'ㅏ', jongseong: 'ㅂㅅ' }
 * disassembleCompleteCharacter('리') // { choseong: 'ㄹ', jungseong: 'ㅣ', jongseong: '' }
 * disassembleCompleteCharacter('빚') // { choseong: 'ㅂ', jungseong: 'ㅣ', jongseong: 'ㅈ' }
 * disassembleCompleteCharacter('박') // { choseong: 'ㅂ', jungseong: 'ㅏ', jongseong: 'ㄱ' }
 */

export function disassembleCompleteCharacter(letter: string): ReturnTypeDisassembleCompleteCharacter | undefined {
  const charCode = letter.charCodeAt(0);

  const isCompleteHangul = COMPLETE_HANGUL_START_CHARCODE <= charCode && charCode <= COMPLETE_HANGUL_END_CHARCODE;

  if (!isCompleteHangul) {
    return undefined;
  }

  const hangulCode = charCode - COMPLETE_HANGUL_START_CHARCODE;

  const jongseongIndex = hangulCode % NUMBER_OF_JONGSEONG;
  const jungseongIndex = ((hangulCode - jongseongIndex) / NUMBER_OF_JONGSEONG) % NUMBER_OF_JUNGSEONG;
  const choseongIndex = Math.floor((hangulCode - jongseongIndex) / NUMBER_OF_JONGSEONG / NUMBER_OF_JUNGSEONG);

  return {
    choseong: CHOSEONGS[choseongIndex],
    jungseong: JUNSEONGS[jungseongIndex],
    jongseong: JONGSEONGS[jongseongIndex],
  } as const;
}
