import { hasValueInReadOnlyStringList } from '@/_internal';
import { CHOSEONGS } from '@/_internal/constants';

/**
 * @name canBeChoseong
 * @description
 * 인자로 받은 문자가 초성으로 위치할 수 있는 문자인지 검사합니다.
 * ```typescript
 * canBeChoseong(
 *   // 대상 문자
 *   character: string
 * ): boolean
 * ```
 * @example
 * canBeChoseong('ㄱ') // true
 * canBeChoseong('ㅃ') // true
 * canBeChoseong('ㄱㅅ') // false
 * canBeChoseong('ㅏ') // false
 * canBeChoseong('가') // false
 */
export function canBeChoseong(character: string): character is (typeof CHOSEONGS)[number] {
  return hasValueInReadOnlyStringList(CHOSEONGS, character);
}
