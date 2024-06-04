import { assembleHangul, canBeChosung, disassembleCompleteHangulCharacter } from '.';
import { isHangulCharacter } from './_internal/hangul';
import { 종성_알파벳_발음, 중성_알파벳_발음, 초성_알파벳_발음 } from './constants';
import { phoneticNotation } from './phoneticNotation';

export function romanize(hangul: string): string {
  const changedHangul = phoneticNotation(hangul);
  let roman = '';

  for (let i = 0; i < changedHangul.length; i += 1) {
    const syllable = changedHangul[i];

    if (isHangulCharacter(syllable)) {
      const disassembledHangul = disassembleCompleteHangulCharacter(syllable) as NonNullable<
        ReturnType<typeof disassembleCompleteHangulCharacter>
      >;

      let chosung: (typeof 초성_알파벳_발음)[keyof typeof 초성_알파벳_발음] | 'l' =
        초성_알파벳_발음[disassembledHangul.first];
      const jungsung = 중성_알파벳_발음[assembleHangul([disassembledHangul.middle]) as keyof typeof 중성_알파벳_발음];
      const jongsung = 종성_알파벳_발음[disassembledHangul.last as keyof typeof 종성_알파벳_발음];

      // 'ㄹ'은 모음 앞에서는 'r'로, 자음 앞이나 어말에서는 'l'로 적는다. 단, 'ㄹㄹ'은 'll'로 적는다. (ex.울릉, 대관령),
      if (disassembledHangul.first === 'ㄹ' && i > 0 && isHangulCharacter(changedHangul[i - 1])) {
        const prevDisassembledHangul = disassembleCompleteHangulCharacter(changedHangul[i - 1]);

        if (prevDisassembledHangul?.last === 'ㄹ') {
          chosung = 'l';
        }
      }

      roman += chosung + jungsung + jongsung;
    } else if (syllable in 중성_알파벳_발음) {
      roman += 중성_알파벳_발음[syllable as keyof typeof 중성_알파벳_발음];
    } else if (canBeChosung(syllable)) {
      roman += 초성_알파벳_발음[syllable as keyof typeof 초성_알파벳_발음];
    } else {
      roman += syllable;
    }
  }

  return roman;
}
