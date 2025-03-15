import { hasValueInReadOnlyStringList } from '@/_internal';
import { JUNSEONGS } from '@/_internal/constants';

/**
 * @name canBeJungseong
 * @description
 * 인자로 받은 문자가 중성으로 위치할 수 있는 문자인지 검사합니다.
 * ```typescript
 * canBeJungseong(
 *   // 대상 문자
 *   character: string
 * ): boolean
 * ```
 * @example
 * canBeJungseong('ㅏ') // true
 * canBeJungseong('ㅗㅏ') // true
 * canBeJungseong('ㅘ') // true
 * canBeJungseong('ㅏㅗ') // false
 * canBeJungseong('ㄱ') // false
 * canBeJungseong('ㄱㅅ') // false
 * canBeJungseong('가') // false
 */
export function canBeJungseong(character: string): character is (typeof JUNSEONGS)[number] {
  return hasValueInReadOnlyStringList(JUNSEONGS, character);
}
