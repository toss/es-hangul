import { disassembleCompleteHangulCharacter } from "./disassembleCompleteHangulCharacter";
import { canBeChosung, canBeJongsung, canBeJungsung, hasBatchim, hasSingleBatchim } from "./utils";

/**
 * 
 * @name needAssemble
 * @description
 * 한글 문자열중 자음이나 모음이 있다면 완전한 문자로 조합 가능한지 검사합니다.
 * @param hangul 변환하고자 하는 한글 문자열
 * @returns 문자로 조합 가능한지 여부
 */
export function needAssemble(hangul: string): boolean {
  for (const Jamo of hangul.matchAll(/[ㄱ-ㅎㅏ-ㅣ]/g)) {
    const letter = Jamo[0];
    const previous = Jamo.index - 1;

    const previousCharacter = hangul.slice(previous, previous + 1);
    if (canBeChosung(previousCharacter) && canBeJungsung(letter)) {
      return true;
    }
    const isPreviousCompleteHangul = /[가-힣]/.test(previousCharacter);
    if (isPreviousCompleteHangul) {
      if (hasBatchim(previousCharacter) === false && canBeJongsung(letter)) {
        return true;
      }
      if (hasSingleBatchim(previousCharacter)) {
        const previousBatchim = disassembleCompleteHangulCharacter(previousCharacter)?.last;
        if(canBeJongsung(previousBatchim + letter))
        {
          return true;
        }
      }
      if (hasBatchim(previousCharacter)) {
        return true;
      }
      if (hasBatchim(previousCharacter) === false)
      {
        const previousJungSung = disassembleCompleteHangulCharacter(previousCharacter)?.middle;
        if (canBeJungsung(previousJungSung + letter))
        {
          return true;
        }
      }
    }
  }
  return false;
}