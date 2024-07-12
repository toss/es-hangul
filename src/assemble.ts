import { disassemble } from './disassemble';
import { binaryAssembleHangul } from './_internal/hangul';

/**
 * @name assembleHangul
 * @description
 * 인자로 받은 배열에 담긴 한글 문장과 문자를 한글 규칙에 맞게 합성합니다.
 * ```typescript
 * assembleHangul(
 *   // 한글 문자와 문장을 담고 있는 배열
 *   words: string[]
 * ): string
 * ```
 * @example
 * assembleHangul(['아버지가', ' ', '방ㅇ', 'ㅔ ', '들ㅇ', 'ㅓ갑니다']) // 아버지가 방에 들어갑니다
 * assembleHangul(['아버지가', ' ', '방에 ', '들어갑니다']) // 아버지가 방에 들어갑니다
 * assembleHangul(['ㅇ', 'ㅏ', 'ㅂ', 'ㅓ', 'ㅈ', 'ㅣ']) // 아버지
 */
export function assembleHangul(words: string[]) {
  const disassembled = disassemble(words.join('')).split('');
  return disassembled.reduce(binaryAssembleHangul);
}
