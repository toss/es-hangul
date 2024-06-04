import { combineHangulCharacter } from './combineHangulCharacter';
import { disassembleHangulToGroups } from './disassemble';
import { excludeLastElement } from './_internal';
// import { disassembleCompleteHangulCharacter } from './disassembleCompleteHangulCharacter';

/**
 * @name removeLastHangulCharacter
 * @description
 * 인자로 주어진 한글 문자열에서 가장 마지막 문자 하나를 제거하여 반환합니다.
 * ```typescript
 * removeLastHangulCharacter(
 *   // 한글 문자열
 *   words: string
 * ): string
 * ```
 * @example
 * removeLastHangulCharacter('안녕하세요 값') // 안녕하세요 갑
 * removeLastHangulCharacter('프론트엔드') // 프론트엔ㄷ
 * removeLastHangulCharacter('일요일') // 일요이
 */
export function removeLastHangulCharacter(words: string) {
  const lastCharacter = words[words.length - 1];
  if (lastCharacter == null) {
    return '';
  }
  const disassembleLastCharacter = disassembleHangulToGroups(lastCharacter);
  const [[first, middle, last]] = excludeLastElement(disassembleLastCharacter[0]);
  const result = middle != null ? combineHangulCharacter(first, middle, last) : first;

  return [words.substring(0, words.length - 1), result].join('');
}
