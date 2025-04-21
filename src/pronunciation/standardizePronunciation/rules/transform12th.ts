import { arrayIncludes } from '@/_internal';
import {
  발음변환_받침_ㅎ,
  발음변환_받침_ㅎ_발음,
  발음변환_첫소리_ㅎ,
  발음변환_첫소리_ㅎ_발음,
  음가가_없는_자음,
} from '../constants';
import type { Nullable, NullableReturnSyllables, ReturnSyllables, Syllable } from './rules.types';
import { replace받침ㅎ } from './rules.utils';

/**
 * 제12항을 적용합니다.
 * @description 제12항 받침 'ㅎ'의 발음은 다음과 같다.
 * @description 'ㅎ(ㄶ, ㅀ)' 뒤에 'ㄱ, ㄷ, ㅈ'이 결합되는 경우에는, 뒤 음절 첫소리와 합쳐서 [ㅋ, ㅌ, ㅊ]으로 발음한다.
 * @description [붙임] 받침 'ㄱ(ㄺ), ㄷ, ㅂ(ㄼ), ㅈ(ㄵ)'이 뒤 음절 첫소리 'ㅎ'과 결합되는 경우에도, 역시 두 음을 합쳐서 [ㅋ, ㅌ, ㅍ, ㅊ]으로 발음한다.
 * @description 'ㅎ(ㄶ, ㅀ)' 뒤에 'ㅅ'이 결합되는 경우에는, 'ㅅ'을 [ㅆ]으로 발음한다.
 * @description 'ㅎ' 뒤에 'ㄴ'이 결합되는 경우에는, [ㄴ]으로 발음한다.
 * @description [붙임] 'ㄶ, ㅀ' 뒤에 'ㄴ'이 결합되는 경우에는, 'ㅎ'을 발음하지 않는다.
 * @description 'ㅎ(ㄶ, ㅀ)' 뒤에 모음으로 시작된 어미나 접미사가 결합되는 경우에는, 'ㅎ'을 발음하지 않는다.
 * @param currentSyllable 현재 음절을 입력합니다.
 * @param nextSyllable 다음 음절을 입력합니다.
 */
export function transform12th(currentSyllable: Syllable, nextSyllable: Nullable<Syllable>): NullableReturnSyllables {
  let current = { ...currentSyllable };
  let next = nextSyllable ? { ...nextSyllable } : nextSyllable;

  if (!current.jongseong) {
    return {
      current,
      next,
    };
  }

  if (arrayIncludes(발음변환_받침_ㅎ, current.jongseong)) {
    if (next) {
      ({ current, next } = handleNextChoseongIsㄱㄷㅈㅅ(current, next));
      ({ current, next } = handleNextChoseongIsㄴ(current, next));
      ({ current, next } = handleNextChoseongIsㅇ(current, next));
    }

    if (!next) {
      ({ current } = handleCurrentJongseongIsㅇ(current));
    }
  }

  ({ current, next } = handleNextChoseongIsㅎ(current, next));

  return {
    current,
    next,
  };
}

function handleNextChoseongIsㄱㄷㅈㅅ(current: Syllable, next: Syllable): ReturnSyllables {
  const updatedCurrent = { ...current };
  const updatedNext = { ...next };

  if (arrayIncludes(['ㄱ', 'ㄷ', 'ㅈ', 'ㅅ'], updatedNext.choseong)) {
    updatedNext.choseong = 발음변환_받침_ㅎ_발음[updatedNext.choseong as keyof typeof 발음변환_받침_ㅎ_발음];
    updatedCurrent.jongseong = replace받침ㅎ(updatedCurrent);
  }

  return { current: updatedCurrent, next: updatedNext };
}

function handleNextChoseongIsㄴ(current: Syllable, next: Syllable): ReturnSyllables {
  const updatedCurrent = { ...current };
  const updatedNext = { ...next };

  if (updatedNext.choseong === 'ㄴ' && arrayIncludes(['ㄴㅎ', 'ㄹㅎ'], updatedCurrent.jongseong)) {
    updatedCurrent.jongseong = replace받침ㅎ(updatedCurrent);
  }
  return { current: updatedCurrent, next: updatedNext };
}

function handleNextChoseongIsㅇ(current: Syllable, next: Syllable): ReturnSyllables {
  const updatedCurrent = { ...current };
  const updatedNext = { ...next };

  if (updatedNext.choseong === 음가가_없는_자음) {
    if (arrayIncludes(['ㄴㅎ', 'ㄹㅎ'], updatedCurrent.jongseong)) {
      updatedCurrent.jongseong = replace받침ㅎ(updatedCurrent);
    } else {
      updatedCurrent.jongseong = '';
    }
  } else {
    updatedCurrent.jongseong = replace받침ㅎ(updatedCurrent);
  }
  return { current: updatedCurrent, next: updatedNext };
}

function handleCurrentJongseongIsㅇ(current: Syllable): Pick<ReturnSyllables, 'current'> {
  const updatedCurrent = { ...current };

  updatedCurrent.jongseong = replace받침ㅎ(updatedCurrent);
  return { current: updatedCurrent };
}

function handleNextChoseongIsㅎ(current: Syllable, next: Nullable<Syllable>): NullableReturnSyllables {
  const updatedCurrent = { ...current };
  const updatedNext = next ? { ...next } : next;

  if (arrayIncludes(발음변환_첫소리_ㅎ, updatedCurrent.jongseong) && arrayIncludes(['ㅎ'], updatedNext?.choseong)) {
    updatedNext.choseong = 발음변환_첫소리_ㅎ_발음[updatedCurrent.jongseong];

    if (updatedCurrent.jongseong.length === 1) {
      updatedCurrent.jongseong = '';
    } else {
      updatedCurrent.jongseong = updatedCurrent.jongseong[0] as Syllable['jongseong'];
    }
  }
  return { current: updatedCurrent, next: updatedNext };
}
