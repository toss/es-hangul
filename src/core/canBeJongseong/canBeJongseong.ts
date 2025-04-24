import { hasValueInReadOnlyStringList } from '@/_internal';
import { JONGSEONGS } from '@/_internal/constants';

/**
 * @name canBeJongseong
 * @description
 * 인자로 받은 문자가 종성으로 위치할 수 있는 문자인지 검사합니다.
 * ```typescript
 * canBeJongseong(
 *   // 대상 문자
 *   character: string
 * ): boolean
 * ```
 * @example
 * canBeJongseong('ㄱ') // true
 * canBeJongseong('ㄱㅅ') // true
 * canBeJongseong('ㅎㄹ') // false
 * canBeJongseong('가') // false
 * canBeJongseong('ㅏ') // false
 * canBeJongseong('ㅗㅏ') // false
 */
export function canBeJongseong(character: string): character is (typeof JONGSEONGS)[number] {
  return hasValueInReadOnlyStringList(JONGSEONGS, character);
}
