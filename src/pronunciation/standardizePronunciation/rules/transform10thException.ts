import { 음가가_없는_자음 } from '../constants';
import type { Nullable, ReturnSyllables, Syllable } from './rules.types';

const 밟_음절 = { choseong: 'ㅂ', jungseong: 'ㅏ', jongseong: 'ㄹㅂ' } as const;
const 넓_음절 = { choseong: 'ㄴ', jungseong: 'ㅓ', jongseong: 'ㄹㅂ' } as const;
// 넓죽하다, 넓둥글다, 넓적하다
const 넓_다음_음절 = [
  { choseong: 'ㅈ', jungseong: 'ㅜ', jongseong: 'ㄱ' }, // 죽
  { choseong: 'ㄷ', jungseong: 'ㅜ', jongseong: 'ㅇ' }, // 둥
  { choseong: 'ㅈ', jungseong: 'ㅓ', jongseong: 'ㄱ' }, // 적
] as const;

function is같은음절(syllable: Syllable, target: Syllable): boolean {
  return (
    syllable.choseong === target.choseong &&
    syllable.jungseong === target.jungseong &&
    syllable.jongseong === target.jongseong
  );
}

/**
 * 제10항 다만을 적용합니다.
 * @description 제10항 다만 - '밟-'은 자음 앞에서 [밥]으로 발음하고, '넓-'은 '넓죽하다, 넓둥글다, 넓적하다'의 경우에 [넙]으로 발음한다.
 * @param currentSyllable 현재 음절을 입력합니다.
 * @param nextSyllable 다음 음절을 입력합니다.
 */
export function transform10thException(
  currentSyllable: Syllable,
  nextSyllable: Nullable<Syllable>
): Pick<ReturnSyllables, 'current'> {
  const current = { ...currentSyllable };

  if (!nextSyllable || nextSyllable.choseong === 음가가_없는_자음) {
    return { current };
  }

  const is밟_자음앞 = is같은음절(current, 밟_음절);
  const is넓_예외 = is같은음절(current, 넓_음절) && 넓_다음_음절.some(target => is같은음절(nextSyllable, target));

  if (is밟_자음앞 || is넓_예외) {
    current.jongseong = 'ㅂ';
  }

  return { current };
}
