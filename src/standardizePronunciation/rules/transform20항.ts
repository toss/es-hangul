import { arrayIncludes } from '../../utils';
import { ReturnSyllables, Syllable } from './rules.types';

/**
 * 제20항을 적용합니다.
 * @description 20항 - ‘ㄴ’은 ‘ㄹ’의 앞이나 뒤에서 [ㄹ]로 발음한다.
 * @description [붙임] 첫소리 ‘ㄴ’이 ‘ㅀ’, ‘ㄾ’ 뒤에 연결되는 경우에도 이에 준한다.
 * @param currentSyllable 현재 음절을 입력합니다.
 * @param nextSyllable 다음 음절을 입력합니다.
 */
export function transform20항(currentSyllable: Syllable, nextSyllable: Syllable): ReturnSyllables {
  let current = { ...currentSyllable };
  let next = { ...nextSyllable };

  ({ current } = applyMainCondition(current, next));
  ({ next } = applySupplementaryCondition(current, next));

  return {
    current,
    next,
  };
}

function applyMainCondition(current: Syllable, next: Syllable): Pick<ReturnSyllables, 'current'> {
  const updatedCurrent = { ...current };

  if (updatedCurrent.last === 'ㄴ' && next.first === 'ㄹ') {
    updatedCurrent.last = 'ㄹ';
  }
  return { current: updatedCurrent };
}

function applySupplementaryCondition(current: Syllable, next: Syllable): Pick<ReturnSyllables, 'next'> {
  const updatedNext = { ...next };

  if (updatedNext.first === 'ㄴ' && (current.last === 'ㄹ' || arrayIncludes(['ㄹㅎ', 'ㄹㅌ'], current.last))) {
    updatedNext.first = 'ㄹ';
  }
  return { next: updatedNext };
}
