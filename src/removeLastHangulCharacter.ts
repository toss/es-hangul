import { combineHangulCharacter } from './combineHangulCharacter';
import { disassembleHangulToGroups } from './disassemble';
import { excludeLastElement } from './_internal';

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
  const disassembledGroups = disassembleHangulToGroups(words);
  const lastCharacter = disassembledGroups.at(-1);

  if (lastCharacter == null) {
    return '';
  }

  const withoutLastCharacter = disassembledGroups
    .filter(v => v !== lastCharacter)
    .map(([first, middle, last]) => {
      if (middle != null) {
        return combineHangulCharacter(first, middle, last);
      }

      return first;
    });

  const [[first, middle, last]] = excludeLastElement(lastCharacter);
  const result = middle != null ? combineHangulCharacter(first, middle, last) : first;

  return [...withoutLastCharacter, result].join('');
}
