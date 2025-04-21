import { arrayIncludes, hasProperty } from '@/_internal';
import { 된소리, 된소리_받침, 어간_받침 } from '../constants';
import type { ReturnSyllables, Syllable } from './rules.types';

/**
 * 제6장 경음화를 적용합니다.
 * @description 제23항 - 받침 'ㄱ(ㄲ, ㅋ, ㄳ, ㄺ), ㄷ(ㅅ, ㅆ, ㅈ, ㅊ, ㅌ), ㅂ(ㅍ, ㄼ, ㄿ, ㅄ)' 뒤에 연결되는 'ㄱ, ㄷ, ㅂ, ㅅ, ㅈ'은 된소리로 발음한다.
 * @description 제24항 - 어간 받침 'ㄴ(ㄵ), ㅁ(ㄻ)' 뒤에 결합되는 어미의 첫소리 'ㄱ, ㄷ, ㅅ, ㅈ'은 된소리로 발음한다.
 * @description 제25항 - 어간 받침 'ㄼ, ㄾ' 뒤에 결합되는 어미의 첫소리 'ㄱ, ㄷ, ㅅ, ㅈ'은 된소리로 발음한다.
 * @param currentSyllable 현재 음절을 입력합니다.
 * @param nextSyllable 다음 음절을 입력합니다.
 */
export function transformHardConversion(
  currentSyllable: Syllable,
  nextSyllable: Syllable
): Pick<ReturnSyllables, 'next'> {
  const next = { ...nextSyllable };

  if (hasProperty(된소리, next.choseong)) {
    const 제23항조건 = arrayIncludes(된소리_받침, currentSyllable.jongseong);
    const 제24_25항조건 = arrayIncludes(어간_받침, currentSyllable.jongseong) && next.choseong !== 'ㅂ';

    if (제23항조건 || 제24_25항조건) {
      next.choseong = 된소리[next.choseong];
    }
  }

  return { next };
}
