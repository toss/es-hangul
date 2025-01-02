import { DISASSEMBLED_VOWELS_BY_VOWEL } from '@/_internal/constants';

/**
 * @name combineVowels
 * @description
 * 인자로 두 개의 모음을 받아 합성하여 겹모음을 생성합니다. 만약 올바른 한글 규칙으로 합성할 수 없는 모음들이라면 단순 Join합니다.
 * ```typescript
 * combineVowels(
 *   // 첫 번째 모음
 *   vowel1: string
 *   // 두 번째 모음
 *   vowel2: string
 * ): string
 * ```
 * @example
 * combineVowels('ㅗ', 'ㅏ') // 'ㅘ'
 * combineVowels('ㅗ', 'ㅐ') // 'ㅙ'
 * combineVowels('ㅗ', 'ㅛ') // 'ㅗㅛ'
 */

type Invert<T extends Record<string, string>> = { [K in keyof T as T[K]]: K };
type CombineVowel = Invert<typeof DISASSEMBLED_VOWELS_BY_VOWEL>;

export function combineVowels<V1 extends string, V2 extends string>(vowel1: V1, vowel2: V2) {
  return (Object.entries(DISASSEMBLED_VOWELS_BY_VOWEL).find(([, value]) => value === `${vowel1}${vowel2}`)?.[0] ??
    `${vowel1}${vowel2}`) as `${V1}${V2}` extends keyof CombineVowel ? CombineVowel[`${V1}${V2}`] : `${V1}${V2}`;
}
