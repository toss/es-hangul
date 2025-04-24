import { isNotUndefined, joinString } from '@/_internal';
import { isHangulAlphabet, isHangulCharacter } from '@/_internal/hangul';
import { combineCharacter } from '@/core/combineCharacter';
import { disassembleCompleteCharacter } from '@/core/disassembleCompleteCharacter';
import {
  transform12th,
  transform13And14th,
  transform16th,
  transform17th,
  transform18th,
  transform19th,
  transform20th,
  transform9And10And11th,
  transformHardConversion,
  transformNLAssimilation,
  type Nullable,
  type Syllable,
} from './rules';

type Options = {
  hardConversion: boolean;
};

type NotHangul = {
  index: number;
  syllable: string;
};

/**
 * 주어진 한글 문자열을 표준 발음으로 변환합니다.
 * @param hangul 한글 문자열을 입력합니다.
 * @param options 변환 옵션을 설정합니다.
 * @param options.hardConversion 경음화 등의 된소리를 적용할지 여부를 설정합니다. 기본값은 true입니다.
 * @returns 변환된 표준 발음 문자열을 반환합니다.
 */
export function standardizePronunciation(hangul: string, options: Options = { hardConversion: true }): string {
  if (!hangul) {
    return '';
  }

  const processSyllables = (syllables: Syllable[], phrase: string, options: Options) =>
    syllables.map((currentSyllable, index, array) => {
      const nextSyllable = index < array.length - 1 ? array[index + 1] : null;

      const { current, next } = applyRules({
        currentSyllable,
        phrase,
        index,
        nextSyllable,
        options,
      });

      if (next) {
        array[index + 1] = next;
      }

      return current;
    });

  const transformHangulPhrase = (phrase: string, options: Options): string => {
    const { notHangulPhrase, disassembleHangul } = 음절분해(phrase);
    const processedSyllables = processSyllables(disassembleHangul, phrase, options);

    return assembleChangedHangul(processedSyllables, notHangulPhrase);
  };

  return hangul
    .split(' ')
    .map(phrase => transformHangulPhrase(phrase, options))
    .join(' ');
}

function 음절분해(hangulPhrase: string): {
  notHangulPhrase: NotHangul[];
  disassembleHangul: Syllable[];
} {
  const notHangulPhrase: NotHangul[] = [];
  const disassembleHangul = Array.from(hangulPhrase)
    .filter((syllable, index) => {
      if (!isHangulCharacter(syllable) || isHangulAlphabet(syllable)) {
        notHangulPhrase.push({
          index,
          syllable,
        });

        return false;
      }

      return true;
    })
    .map(disassembleCompleteCharacter)
    .filter(isNotUndefined);

  return { notHangulPhrase, disassembleHangul };
}

type ApplyParameters = {
  currentSyllable: Syllable;
  nextSyllable: Nullable<Syllable>;
  index: number;
  phrase: string;
  options: NonNullable<Parameters<typeof standardizePronunciation>[1]>;
};

function applyRules(params: ApplyParameters): {
  current: Syllable;
  next: Nullable<Syllable>;
} {
  const { currentSyllable, nextSyllable, index, phrase, options } = params;

  let current = { ...currentSyllable };
  let next = nextSyllable ? { ...nextSyllable } : nextSyllable;

  if (next && options.hardConversion) {
    ({ next } = transformHardConversion(current, next));
  }

  if (next) {
    ({ current, next } = transform16th({
      currentSyllable: current,
      nextSyllable: next,
      index,
      phrase,
    }));
    ({ current, next } = transform17th(current, next));
    ({ next } = transform19th(current, next));
    ({ current, next } = transformNLAssimilation(current, next));
    ({ current } = transform18th(current, next));
    ({ current, next } = transform20th(current, next));
  }

  ({ current, next } = transform12th(current, next));

  if (next) {
    ({ current, next } = transform13And14th(current, next));
  }

  ({ current } = transform9And10And11th(current, next));

  return {
    current,
    next,
  };
}

function assembleChangedHangul(disassembleHangul: Syllable[], notHangulPhrase: NotHangul[]): string {
  const changedSyllables = disassembleHangul
    .filter(isNotUndefined)
    .map(syllable => combineCharacter(syllable.choseong, syllable.jungseong, syllable.jongseong));

  for (const { index, syllable } of notHangulPhrase) {
    changedSyllables.splice(index, 0, syllable);
  }

  return joinString(...changedSyllables);
}
