import { canBeJungseong } from '@/core/canBeJungseong';
import { disassembleToGroups } from '@/core/disassembleToGroups';
import { excludeLastElement } from '@/_internal';
import { combineCharacter } from '../combineCharacter';

/**
 * @name removeLastCharacter
 * @description
 * 인자로 주어진 한글 문자열에서 가장 마지막 문자 하나를 제거하여 반환합니다.
 * ```typescript
 * removeLastCharacter(
 *   // 한글 문자열
 *   words: string
 * ): string
 * ```
 * @example
 * removeLastCharacter('안녕하세요 값') // 안녕하세요 갑
 * removeLastCharacter('프론트엔드') // 프론트엔ㄷ
 * removeLastCharacter('일요일') // 일요이
 * removeLastCharacter('전화') // 전호
 * removeLastCharacter('신세계') // 신세ㄱ
 */
export function removeLastCharacter(words: string) {
  const lastCharacter = words[words.length - 1];
  if (lastCharacter == null) {
    return '';
  }

  const result = (() => {
    const disassembleLastCharacter = disassembleToGroups(lastCharacter);
    const [lastCharacterWithoutLastAlphabet] = excludeLastElement(disassembleLastCharacter[0]);
    if (lastCharacterWithoutLastAlphabet.length <= 3) {
      const [first, middle, last] = lastCharacterWithoutLastAlphabet;
      if (middle != null) {
        return canBeJungseong(last)
          ? combineCharacter(first, `${middle}${last}`)
          : combineCharacter(first, middle, last);
      }

      return first;
    } else {
      const [first, firstJungseong, secondJungseong, firstJongseong] = lastCharacterWithoutLastAlphabet;

      return combineCharacter(first, `${firstJungseong}${secondJungseong}`, firstJongseong);
    }
  })();

  return [words.substring(0, words.length - 1), result].join('');
}
