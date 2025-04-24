import { disassemble } from '../disassemble';
import { binaryAssemble } from '@/_internal/hangul';

/**
 * @name assemble
 * @description
 * 인자로 받은 배열에 담긴 한글 문장과 문자를 한글 규칙에 맞게 합성합니다.
 * ```typescript
 * assemble(
 *   // 한글 문자와 문장을 담고 있는 배열
 *   fragments: string[]
 * ): string
 * ```
 * @example
 * assemble(['아버지가', ' ', '방ㅇ', 'ㅔ ', '들ㅇ', 'ㅓ갑니다']) // 아버지가 방에 들어갑니다
 * assemble(['아버지가', ' ', '방에 ', '들어갑니다']) // 아버지가 방에 들어갑니다
 * assemble(['ㅇ', 'ㅏ', 'ㅂ', 'ㅓ', 'ㅈ', 'ㅣ']) // 아버지
 */
export function assemble(fragments: string[]) {
  const disassembled = disassemble(fragments.join('')).split('');
  return disassembled.reduce(binaryAssemble);
}
