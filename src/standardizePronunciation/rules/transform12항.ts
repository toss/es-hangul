import { arrayIncludes } from '../../utils';
import {
  발음변환_받침_ㅎ,
  발음변환_받침_ㅎ_발음,
  발음변환_첫소리_ㅎ,
  발음변환_첫소리_ㅎ_발음,
  음가가_없는_자음,
} from '../standardizePronunciation.constants';
import { Nullable, NullableReturnSyllables, ReturnSyllables, Syllable } from './rules.types';
import { replace받침ㅎ } from './rules.utils';

/**
 * 제12항을 적용합니다.
 * @description 제12항 받침 ‘ㅎ’의 발음은 다음과 같다.
 * @description ‘ㅎ(ㄶ, ㅀ)’ 뒤에 ‘ㄱ, ㄷ, ㅈ’이 결합되는 경우에는, 뒤 음절 첫소리와 합쳐서 [ㅋ, ㅌ, ㅊ]으로 발음한다.
 * @description [붙임] 받침 ‘ㄱ(ㄺ), ㄷ, ㅂ(ㄼ), ㅈ(ㄵ)’이 뒤 음절 첫소리 ‘ㅎ’과 결합되는 경우에도, 역시 두 음을 합쳐서 [ㅋ, ㅌ, ㅍ, ㅊ]으로 발음한다.
 * @description ‘ㅎ(ㄶ, ㅀ)’ 뒤에 ‘ㅅ’이 결합되는 경우에는, ‘ㅅ’을 [ㅆ]으로 발음한다.
 * @description ‘ㅎ’ 뒤에 ‘ㄴ’이 결합되는 경우에는, [ㄴ]으로 발음한다.
 * @description [붙임] ‘ㄶ, ㅀ’ 뒤에 ‘ㄴ’이 결합되는 경우에는, ‘ㅎ’을 발음하지 않는다.
 * @description ‘ㅎ(ㄶ, ㅀ)’ 뒤에 모음으로 시작된 어미나 접미사가 결합되는 경우에는, ‘ㅎ’을 발음하지 않는다.
 * @param currentSyllable 현재 음절을 입력합니다.
 * @param nextSyllable 다음 음절을 입력합니다.
 */
export function transform12항(currentSyllable: Syllable, nextSyllable: Nullable<Syllable>): NullableReturnSyllables {
  let current = { ...currentSyllable };
  let next = nextSyllable ? { ...nextSyllable } : nextSyllable;

  if (!current.last) {
    return {
      current,
      next,
    };
  }

  if (arrayIncludes(발음변환_받침_ㅎ, current.last)) {
    if (next) {
      ({ current, next } = handleNextFirstIsㄱㄷㅈㅅ(current, next));
      ({ current, next } = handleNextFirstIsㄴ(current, next));
      ({ current, next } = handleNextFirstIsㅇ(current, next));
    }

    if (!next) {
      ({ current } = handleCurrentLastIsㅇ(current));
    }
  }

  ({ current, next } = handleNextFirstIsㅎ(current, next));

  return {
    current,
    next,
  };
}

function handleNextFirstIsㄱㄷㅈㅅ(current: Syllable, next: Syllable): ReturnSyllables {
  const updatedCurrent = { ...current };
  const updatedNext = { ...next };

  if (arrayIncludes(['ㄱ', 'ㄷ', 'ㅈ', 'ㅅ'], updatedNext.first)) {
    updatedNext.first = 발음변환_받침_ㅎ_발음[updatedNext.first as keyof typeof 발음변환_받침_ㅎ_발음];
    updatedCurrent.last = replace받침ㅎ(updatedCurrent);
  }

  return { current: updatedCurrent, next: updatedNext };
}

function handleNextFirstIsㄴ(current: Syllable, next: Syllable): ReturnSyllables {
  const updatedCurrent = { ...current };
  const updatedNext = { ...next };

  if (updatedNext.first === 'ㄴ' && arrayIncludes(['ㄴㅎ', 'ㄹㅎ'], updatedCurrent.last)) {
    updatedCurrent.last = replace받침ㅎ(updatedCurrent);
  }
  return { current: updatedCurrent, next: updatedNext };
}

function handleNextFirstIsㅇ(current: Syllable, next: Syllable): ReturnSyllables {
  const updatedCurrent = { ...current };
  const updatedNext = { ...next };

  if (updatedNext.first === 음가가_없는_자음) {
    if (arrayIncludes(['ㄴㅎ', 'ㄹㅎ'], updatedCurrent.last)) {
      updatedCurrent.last = replace받침ㅎ(updatedCurrent);
    } else {
      updatedCurrent.last = '';
    }
  } else {
    updatedCurrent.last = replace받침ㅎ(updatedCurrent);
  }
  return { current: updatedCurrent, next: updatedNext };
}

function handleCurrentLastIsㅇ(current: Syllable): Pick<ReturnSyllables, 'current'> {
  const updatedCurrent = { ...current };

  updatedCurrent.last = replace받침ㅎ(updatedCurrent);
  return { current: updatedCurrent };
}

function handleNextFirstIsㅎ(current: Syllable, next: Nullable<Syllable>): NullableReturnSyllables {
  const updatedCurrent = { ...current };
  const updatedNext = next ? { ...next } : next;

  if (arrayIncludes(발음변환_첫소리_ㅎ, updatedCurrent.last) && arrayIncludes(['ㅎ'], updatedNext?.first)) {
    updatedNext.first = 발음변환_첫소리_ㅎ_발음[updatedCurrent.last];

    if (updatedCurrent.last.length === 1) {
      updatedCurrent.last = '';
    } else {
      updatedCurrent.last = updatedCurrent.last[0] as Syllable['last'];
    }
  }
  return { current: updatedCurrent, next: updatedNext };
}
