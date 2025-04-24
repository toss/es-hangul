import { hasProperty } from '@/_internal';
import { 음의_동화_받침 } from '../constants';
import type { ReturnSyllables, Syllable } from './rules.types';

/**
 * 제17항을 적용합니다.
 * @description 17항 - 받침 ‘ㄷ', 'ㅌ(ㄾ)’이 조사나 접미사의 모음 ‘ㅣ’와 결합되는 경우에는, [ㅈ, ㅊ]으로 바꾸어서 뒤 음절 첫소리로 옮겨 발음한다.
 * @description [붙임] ‘ㄷ’ 뒤에 접미사 ‘히’가 결합되어 ‘티’를 이루는 것은 [치]로 발음한다.
 * @param currentSyllable 현재 음절을 입력합니다.
 * @param nextSyllable 다음 음절을 입력합니다.
 * @returns 17항이 적용되었는지의 여부를 반환합니다.
 */
export function transform17th(currentSyllable: Syllable, nextSyllable: Syllable): ReturnSyllables {
  let current = { ...currentSyllable };
  let next = { ...nextSyllable };

  const 제17항주요조건 = next.jungseong === 'ㅣ';

  if (!제17항주요조건) {
    return {
      current,
      next,
    };
  }

  ({ current, next } = handleChoseongIsㅇ(current, next));
  ({ current, next } = handleChoseongIsㅎAndㄷ(current, next));

  return {
    current,
    next,
  };
}

function handleChoseongIsㅇ(current: Syllable, next: Syllable): ReturnSyllables {
  const updatedCurrent = { ...current };
  const updatedNext = { ...next };

  if (updatedNext.choseong === 'ㅇ' && hasProperty(음의_동화_받침, updatedCurrent.jongseong)) {
    updatedNext.choseong = 음의_동화_받침[updatedCurrent.jongseong];
    updatedCurrent.jongseong = updatedCurrent.jongseong === 'ㄹㅌ' ? 'ㄹ' : '';
  }
  return { current: updatedCurrent, next: updatedNext };
}

function handleChoseongIsㅎAndㄷ(current: Syllable, next: Syllable): ReturnSyllables {
  const updatedCurrent = { ...current };
  const updatedNext = { ...next };

  if (updatedNext.choseong === 'ㅎ' && updatedCurrent.jongseong === 'ㄷ') {
    updatedNext.choseong = 'ㅊ';
    updatedCurrent.jongseong = '';
  }
  return { current: updatedCurrent, next: updatedNext };
}
