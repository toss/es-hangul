import { arrayIncludes } from '@/_internal';
import { 자음동화_받침_ㄴ_변환 } from '../constants';
import type { ReturnSyllables, Syllable } from './rules.types';

/**
 * 제19항을 적용합니다.
 * @description 19항 - 받침 ‘ㅁ, ㅇ’ 뒤에 연결되는 ‘ㄹ’은 [ㄴ]으로 발음한다.
 * @description [붙임] 받침 ‘ㄱ, ㅂ’ 뒤에 연결되는 ‘ㄹ’도 [ㄴ]으로 발음한다.
 * @param currentSyllable 현재 음절을 입력합니다.
 * @param nextSyllable 다음 음절을 입력합니다.
 */
export function transform19th(currentSyllable: Syllable, nextSyllable: Syllable): Pick<ReturnSyllables, 'next'> {
  const next = { ...nextSyllable };
  const 제19항조건 = arrayIncludes(자음동화_받침_ㄴ_변환, currentSyllable.jongseong) && next.choseong === 'ㄹ';

  if (제19항조건) {
    next.choseong = 'ㄴ';
  }

  return { next };
}
