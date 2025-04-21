import { arrayIncludes } from '@/_internal';
import { 음가가_없는_자음, 특별한_한글_자모, 특별한_한글_자모의_발음, 한글_자모 } from '../constants';
import type { ReturnSyllables, Syllable } from './rules.types';

type Apply16항 = {
  currentSyllable: Syllable;
  nextSyllable: Syllable;
  phrase: string;
  index: number;
};
/**
 * 제16항을 적용합니다.
 * @description 제16항 - 한글 자모의 이름은 그 받침소리를 연음하되, ‘ㄷ, ㅈ, ㅊ, ㅋ, ㅌ, ㅍ, ㅎ’의 경우에는 특별히 다음과 같이 발음한다. ㄷ, ㅈ, ㅊ, ㅌ, ㅎ > ㅅ (디귿이:디그시, 지읒이:지으시, 치읓이:치으시, 티읕이:티으시, 히읗이:히으시), ㅋ > ㄱ (키읔이:키으기), ㅍ > ㅂ (피읖이:피으비)
 * @param currentSyllable 현재 음절을 입력합니다.
 * @param nextSyllable 다음 음절을 입력합니다.
 * @param phrase 분리되지 않은 한글 구절을 입력합니다.
 * @param index 현재 음절의 순서를 입력합니다.
 * @returns 16항이 적용되었는지의 여부를 반환합니다.
 */
export function transform16th({ currentSyllable, phrase, index, nextSyllable }: Apply16항): ReturnSyllables {
  let current = { ...currentSyllable };
  let next = { ...nextSyllable };

  const 제16항주요조건 = current.jongseong && next.choseong === 음가가_없는_자음;

  if (!제16항주요조건) {
    return {
      current,
      next,
    };
  }

  const combinedSyllables = phrase[index - 1] + phrase[index];

  ({ current, next } = handleSpecialHangulCharacters({ current, next, combinedSyllables }));
  ({ current, next } = handleHangulCharacters({ current, next, combinedSyllables }));

  return {
    current,
    next,
  };
}

function handleSpecialHangulCharacters({
  current,
  next,
  combinedSyllables,
}: ReturnSyllables & {
  combinedSyllables: string;
}): ReturnSyllables {
  const updatedCurrent = { ...current };
  const updatedNext = { ...next };

  if (arrayIncludes(특별한_한글_자모, combinedSyllables)) {
    const 다음_음절의_초성 = 특별한_한글_자모의_발음[updatedCurrent.jongseong as keyof typeof 특별한_한글_자모의_발음];

    updatedCurrent.jongseong = '';
    updatedNext.choseong = 다음_음절의_초성;
  }
  return { current: updatedCurrent, next: updatedNext };
}

function handleHangulCharacters({
  current,
  next,
  combinedSyllables,
}: ReturnSyllables & {
  combinedSyllables: string;
}): ReturnSyllables {
  const updatedCurrent = { ...current };
  const updatedNext = { ...next };

  if (arrayIncludes(한글_자모, combinedSyllables)) {
    updatedNext.choseong = updatedCurrent.jongseong as typeof updatedNext.choseong;

    if (updatedCurrent.jongseong !== 'ㅇ') {
      updatedCurrent.jongseong = '';
    }
  }
  return { current: updatedCurrent, next: updatedNext };
}
