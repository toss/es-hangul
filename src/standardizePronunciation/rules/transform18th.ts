import { arrayIncludes } from '../../utils';
import { 비음화_받침_ㄴ_변환, 비음화_받침_ㅁ_변환, 비음화_받침_ㅇ_변환 } from '../standardizePronunciation.constants';
import { ReturnSyllables, Syllable } from './rules.types';

/**
 * 제18항을 적용합니다.
 * @description 18항 - 받침 ‘ㄱ(ㄲ, ㅋ, ㄳ, ㄺ), ㄷ(ㅅ, ㅆ, ㅈ, ㅊ, ㅌ, ㅎ), ㅂ(ㅍ, ㄼ, ㄿ, ㅄ)’은 ‘ㄴ, ㅁ’ 앞에서 [ㅇ, ㄴ, ㅁ]으로 발음한다.
 * @param currentSyllable 현재 음절을 입력합니다.
 * @param nextSyllable 다음 음절을 입력합니다.
 * @returns 18항이 적용되었는지의 여부를 반환합니다.
 */
export function transform18th(currentSyllable: Syllable, nextSyllable: Syllable): Pick<ReturnSyllables, 'current'> {
  const current = { ...currentSyllable };

  const 제18항주요조건 = current.last && arrayIncludes(['ㄴ', 'ㅁ'], nextSyllable.first);

  if (!제18항주요조건) {
    return {
      current,
    };
  }

  if (arrayIncludes(비음화_받침_ㅇ_변환, current.last)) {
    current.last = 'ㅇ';
  }

  if (arrayIncludes(비음화_받침_ㄴ_변환, current.last)) {
    current.last = 'ㄴ';
  }

  if (arrayIncludes(비음화_받침_ㅁ_변환, current.last)) {
    current.last = 'ㅁ';
  }

  return {
    current,
  };
}
