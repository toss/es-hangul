import { joinString } from '../_internal';
import { isHangulAlphabet, isHangulCharacter } from '../_internal/hangul';
import { combineHangulCharacter } from '../combineHangulCharacter';
import { disassembleCompleteHangulCharacter } from '../disassembleCompleteHangulCharacter';
import { isNotUndefined } from '../utils';
import {
  Nullable,
  applyㄴㄹ덧남,
  apply경음화,
  apply제12항,
  apply제13과14항,
  apply제16항,
  apply제17항,
  apply제18항,
  apply제19항,
  apply제20항,
  apply제9와10과11항,
  type Syllable,
} from './standardizePronunciation.rules';

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
export function standardizePronunciation(
  hangul: string,
  options: {
    hardConversion: boolean;
  } = { hardConversion: true }
): string {
  if (!hangul) {
    return '';
  }

  const hangulPhrases = hangul.split(' ');
  const changedHangul: string[] = [];

  for (const hangulPhrase of hangulPhrases) {
    const { notHangulPhrase, disassembleHangul } = 음절분해(hangulPhrase);

    for (let i = 0; i < disassembleHangul.length; i += 1) {
      const currentSyllable = disassembleHangul[i];
      const nextSyllable = i < disassembleHangul.length - 1 ? disassembleHangul[i + 1] : null;

      applyRules(currentSyllable, nextSyllable, i, hangulPhrase, options);
    }

    changedHangul.push(assembleChangedHangul(disassembleHangul, notHangulPhrase));
  }

  return changedHangul.join(' ');
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
    .map(disassembleCompleteHangulCharacter)
    .filter(isNotUndefined);

  return { notHangulPhrase, disassembleHangul };
}

function applyRules(
  currentSyllable: Syllable,
  nextSyllable: Nullable<Syllable>,
  index: number,
  hangulPhrase: string,
  options: NonNullable<Parameters<typeof standardizePronunciation>[1]>
): void {
  if (nextSyllable) {
    if (options.hardConversion) {
      apply경음화(currentSyllable, nextSyllable);
    }

    if (index > 0) {
      const { isChanged: is제16항Changed } = apply제16항(currentSyllable, nextSyllable, hangulPhrase, index);

      if (is제16항Changed) {
        return;
      }
    }

    const { isChanged: is제17항Changed } = apply제17항(currentSyllable, nextSyllable);

    if (is제17항Changed) {
      return;
    }

    apply제19항(currentSyllable, nextSyllable);
    applyㄴㄹ덧남(currentSyllable, nextSyllable);

    const { isChanged: is제18항Changed } = apply제18항(currentSyllable, nextSyllable);

    if (is제18항Changed) {
      return;
    }

    apply제20항(currentSyllable, nextSyllable);
  }

  apply제12항(currentSyllable, nextSyllable);

  if (nextSyllable) {
    const { isChanged } = apply제13과14항(currentSyllable, nextSyllable);

    if (isChanged) {
      return;
    }
  }

  apply제9와10과11항(currentSyllable, nextSyllable);
}

function assembleChangedHangul(disassembleHangul: Syllable[], notHangulPhrase: NotHangul[]): string {
  const changedSyllables = disassembleHangul
    .filter(isNotUndefined)
    .map(syllable => combineHangulCharacter(syllable.first, syllable.middle, syllable.last));

  for (const { index, syllable } of notHangulPhrase) {
    changedSyllables.splice(index, 0, syllable);
  }

  return joinString(...changedSyllables);
}
