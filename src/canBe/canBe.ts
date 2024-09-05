import { CHOSEONGS, JONGSEONGS, JUNSEONGS } from '@/_internal/constants';
import { hasValueInReadOnlyStringList } from '../_internal';

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
 * canBeJungseong('ㅏㅗ') // false
 * canBeJungseong('ㄱ') // false
 * canBeJungseong('ㄱㅅ') // false
 * canBeJungseong('가') // false
 */
export function canBeJungseong(character: string): character is (typeof JUNSEONGS)[number] {
  return hasValueInReadOnlyStringList(JUNSEONGS, character);
}

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
