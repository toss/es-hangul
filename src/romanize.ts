import { isHangulCharacter } from './_internal/hangul';
import { assembleHangul } from './assemble';
import { 종성_알파벳_발음, 중성_알파벳_발음, 초성_알파벳_발음 } from './constants';
import { disassembleCompleteHangulCharacter } from './disassembleCompleteHangulCharacter';
import { standardizePronunciation } from './standardizePronunciation';
import { canBeChoseong } from './utils';

/**
 * 주어진 한글 문자열을 로마자로 변환합니다.
 * @param hangul 한글 문자열을 입력합니다.
 * @returns 변환된 로마자를 반환합니다.
 */
export function romanize(hangul: string): string {
  const changedHangul = standardizePronunciation(hangul, { hardConversion: false });

  return changedHangul
    .split('')
    .map((_, i, arrayHangul) => romanizeSyllableHangul(arrayHangul, i))
    .join('');
}

const romanizeSyllableHangul = (arrayHangul: string[], index: number): string => {
  const syllable = arrayHangul[index];

  if (isHangulCharacter(syllable)) {
    const disassemble = disassembleCompleteHangulCharacter(syllable) as NonNullable<
      ReturnType<typeof disassembleCompleteHangulCharacter>
    >;

    let choseong: (typeof 초성_알파벳_발음)[keyof typeof 초성_알파벳_발음] | 'l' = 초성_알파벳_발음[disassemble.first];
    const jungseong = 중성_알파벳_발음[assembleHangul([disassemble.middle]) as keyof typeof 중성_알파벳_발음];
    const jongseong = 종성_알파벳_발음[disassemble.last as keyof typeof 종성_알파벳_발음];

    // 'ㄹ'은 모음 앞에서는 'r'로, 자음 앞이나 어말에서는 'l'로 적는다. 단, 'ㄹㄹ'은 'll'로 적는다. (ex.울릉, 대관령),
    if (disassemble.first === 'ㄹ' && index > 0 && isHangulCharacter(arrayHangul[index - 1])) {
      const prevDisassemble = disassembleCompleteHangulCharacter(arrayHangul[index - 1]);

      if (prevDisassemble?.last === 'ㄹ') {
        choseong = 'l';
      }
    }

    return choseong + jungseong + jongseong;
  }

  if (hasProperty(중성_알파벳_발음, syllable)) {
    return 중성_알파벳_발음[syllable];
  }

  if (hasProperty(초성_알파벳_발음, syllable)) {
    return 초성_알파벳_발음[syllable];
  }

  return syllable;
};
