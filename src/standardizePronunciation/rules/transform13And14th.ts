import { arrayIncludes } from '../../_internal';
import { 음가가_없는_자음 } from '../standardizePronunciation.constants';
import { ReturnSyllables, Syllable } from './rules.types';

const 받침의길이 = {
  홀받침: 1,
  쌍_겹받침: 2,
} as const;

/**
 * 제13, 14항을 적용합니다.
 * @description 제13항 - 홑받침이나 쌍받침이 모음으로 시작된 조사나 어미, 접미사와 결합되는 경우에는, 제 음가대로 뒤 음절 첫소리로 옮겨 발음한다.
 * @description 제14항 - 겹받침이 모음으로 시작된 조사나 어미, 접미사와 결합되는 경우에는, 뒤엣것만을 뒤 음절 첫소리로 옮겨 발음한다.
 * @param currentSyllable 현재 음절을 입력합니다.
 * @param nextSyllable 다음 음절을 입력합니다.
 * @returns 13, 14항이 적용되었는지의 여부를 반환합니다.
 */
export function transform13And14th(currentSyllable: Syllable, nextSyllable: Syllable): ReturnSyllables {
  let current = { ...currentSyllable };
  let next = { ...nextSyllable };

  const 제13_14항주요조건 = current.last && next.first === 음가가_없는_자음;

  if (!제13_14항주요조건) {
    return {
      current,
      next,
    };
  }

  ({ current, next } = handle홑받침or쌍받침(current, next));
  ({ current, next } = handle겹받침(current, next));

  return {
    current,
    next,
  };
}

function is홑받침(current: Syllable): boolean {
  return current.last.length === 받침의길이['홀받침'];
}

function is쌍받침(current: Syllable): boolean {
  return current.last.length === 받침의길이['쌍_겹받침'] && current.last[0] === current.last[1];
}

function is겹받침(current: Syllable): boolean {
  return current.last.length === 받침의길이['쌍_겹받침'] && current.last[0] !== current.last[1];
}

function handle홑받침or쌍받침(current: Syllable, next: Syllable): ReturnSyllables {
  const updatedCurrent = { ...current };
  const updatedNext = { ...next };

  if (!arrayIncludes(['ㅇ', ''], updatedCurrent.last) && (is홑받침(updatedCurrent) || is쌍받침(updatedCurrent))) {
    updatedNext.first = updatedCurrent.last;
    updatedCurrent.last = '';
  }
  return { current: updatedCurrent, next: updatedNext };
}

function handle겹받침(current: Syllable, next: Syllable): ReturnSyllables {
  const updatedCurrent = { ...current };
  const updatedNext = { ...next };

  if (is겹받침(updatedCurrent)) {
    if (updatedCurrent.last[1] === 'ㅅ') {
      updatedNext.first = 'ㅆ';
    } else {
      updatedNext.first = updatedCurrent.last[1] as Syllable['first'];
    }
    updatedCurrent.last = updatedCurrent.last.replace(updatedCurrent.last[1], '') as Syllable['last'];
  }
  return { current: updatedCurrent, next: updatedNext };
}
