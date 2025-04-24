import { arrayIncludes } from '@/_internal';
import {
  ㄴㄹ이_덧나는_모음,
  ㄴㄹ이_덧나는_후속음절_모음,
  ㄴㄹ이_덧나서_받침_ㄴ_변환,
  ㄴㄹ이_덧나서_받침_ㄹ_변환,
} from '../constants';
import type { ReturnSyllables, Syllable } from './rules.types';

/**
 * 'ㄴ,ㄹ'이 덧나는 경우(동화작용)를 적용합니다.
 * @description 합성어에서 둘째 요소가 '야, 여, 요, 유, 얘, 예' 등으로 시작되는 말이면 'ㄴ, ㄹ'이 덧난다
 * @link https://www.youtube.com/watch?v=Mm2JX2naqWk
 * @link http://contents2.kocw.or.kr/KOCW/data/document/2020/seowon/choiyungon0805/12.pdf
 * @param currentSyllable 현재 음절을 입력합니다.
 * @param nextSyllable 다음 음절을 입력합니다.
 */
export function transformNLAssimilation(currentSyllable: Syllable, nextSyllable: Syllable): ReturnSyllables {
  let current = { ...currentSyllable };
  let next = { ...nextSyllable };

  const ㄴㄹ이덧나는조건 =
    current.jongseong && next.choseong === 'ㅇ' && arrayIncludes(ㄴㄹ이_덧나는_후속음절_모음, next.jungseong);

  if (!ㄴㄹ이덧나는조건) {
    return {
      current,
      next,
    };
  }

  ({ current, next } = applyㄴㄹ덧남(current, next));

  return {
    current,
    next,
  };
}

function applyㄴㄹ덧남(current: Syllable, next: Syllable): ReturnSyllables {
  const updatedCurrent = { ...current };
  const updatedNext = { ...next };

  if (arrayIncludes(ㄴㄹ이_덧나는_모음, updatedCurrent.jungseong)) {
    if (arrayIncludes(ㄴㄹ이_덧나서_받침_ㄴ_변환, updatedCurrent.jongseong)) {
      updatedCurrent.jongseong = updatedCurrent.jongseong === 'ㄱ' ? 'ㅇ' : updatedCurrent.jongseong;
      updatedNext.choseong = 'ㄴ';
    }

    if (arrayIncludes(ㄴㄹ이_덧나서_받침_ㄹ_변환, updatedCurrent.jongseong)) {
      updatedNext.choseong = 'ㄹ';
    }
  } else {
    // ㄴ/ㄹ이 되기 위한 조건이지만 현재 음절의 중성의 ∙(아래아)가 하나가 아닐 경우에는 덧나지 않고 연음규칙이 적용된다
    updatedNext.choseong = updatedCurrent.jongseong as typeof updatedNext.choseong;
  }

  return { current: updatedCurrent, next: updatedNext };
}
