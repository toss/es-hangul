import { assemble } from '@/core/assemble';
import { convertQwertyToAlphabet } from '@/keyboard/convertQwertyToAlphabet';

/**
 * @name convertQwertyToHangul
 * @description
 * 영어 알파벳을 qwerty 자판과 매칭과는 한글 문자와 문장으로 변환합니다.
 * @param word 한글 문장으로 변환하고자 하는 영문
 * @returns qwerty 영어 알파벳을 변환하여 한글 규칙에 맞게 합성한 문자열
 */
export function convertQwertyToHangul(word: string): string {
  if (!word) {
    return '';
  }
  return assemble([...convertQwertyToAlphabet(word)]);
}
