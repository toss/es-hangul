import { hasProperty } from '@/_internal';
import { DISASSEMBLED_CONSONANTS_BY_CONSONANT, DISASSEMBLED_VOWELS_BY_VOWEL } from '@/_internal/constants';
import { disassembleCompleteCharacter } from '@/core/disassembleCompleteCharacter';

export function disassembleToGroups(str: string) {
  /*
   * FIXME(@raon0211):
   * Array#map을 사용하는 경우 Safari에서 'Array size is not a small enough positive integer' 오류가 발생함.
   * 우선 map을 사용하지 않음으로써 문제를 회피함
   * @see https://sentry.io/organizations/toss/issues/2432344954/?project=1242586&referrer=slack
   * @see https://bugs.webkit.org/show_bug.cgi?id=211619
   */
  const result: string[][] = [];

  for (const letter of str) {
    const disassembledComplete = disassembleCompleteCharacter(letter);

    if (disassembledComplete != null) {
      result.push([
        ...disassembledComplete.choseong,
        ...disassembledComplete.jungseong,
        ...disassembledComplete.jongseong,
      ]);
      continue;
    }

    if (hasProperty(DISASSEMBLED_CONSONANTS_BY_CONSONANT, letter)) {
      const disassembledConsonant = DISASSEMBLED_CONSONANTS_BY_CONSONANT[letter];

      result.push([...disassembledConsonant]);
      continue;
    }

    if (hasProperty(DISASSEMBLED_VOWELS_BY_VOWEL, letter)) {
      const disassembledVowel = DISASSEMBLED_VOWELS_BY_VOWEL[letter];

      result.push([...disassembledVowel]);
      continue;
    }

    result.push([letter]);
  }

  return result;
}
