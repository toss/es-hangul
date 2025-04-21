import { hasProperty } from '@/_internal';
import { 받침_대표음_발음, 음가가_없는_자음 } from '../constants';
import type { Nullable, ReturnSyllables, Syllable } from './rules.types';

/**
 * 제9, 10항, 11항을 적용합니다.
 * @description 제9항 - 받침 ‘ㄲ, ㅋ’, ‘ㅅ, ㅆ, ㅈ, ㅊ, ㅌ’, ‘ㅍ’은 어말 또는 자음 앞에서 각각 대표음 [ㄱ, ㄷ, ㅂ]으로 발음한다.
 * @description 제10항 - 겹받침 ‘ㄳ’, ‘ㄵ’, ‘ㄼ, ㄽ, ㄾ’, ‘ㅄ’은 어말 또는 자음 앞에서 각각 [ㄱ, ㄴ, ㄹ, ㅂ]으로 발음한다.
 * @description 제11항 - 겹받침 ‘ㄺ, ㄻ, ㄿ’은 어말 또는 자음 앞에서 각각 [ㄱ, ㅁ, ㅂ]으로 발음한다.
 * @param currentSyllable 현재 음절을 입력합니다.
 * @param nextSyllable 다음 음절을 입력합니다.
 */
export function transform9And10And11th(
  currentSyllable: Syllable,
  nextSyllable: Nullable<Syllable>
): Pick<ReturnSyllables, 'current'> {
  const current = { ...currentSyllable };

  const is어말 = current.jongseong && !nextSyllable;
  const is음가있는자음앞 = current.jongseong && nextSyllable?.choseong !== 음가가_없는_자음;

  const 제9_10_11항주요조건 = (is어말 || is음가있는자음앞) && hasProperty(받침_대표음_발음, current.jongseong);

  if (제9_10_11항주요조건) {
    current.jongseong = 받침_대표음_발음[current.jongseong as keyof typeof 받침_대표음_발음];
  }

  return { current };
}
