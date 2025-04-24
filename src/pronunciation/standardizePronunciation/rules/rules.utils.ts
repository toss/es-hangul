import { Syllable } from './rules.types';

export function replace받침ㅎ(currentSyllable: Syllable): Syllable['jongseong'] {
  return currentSyllable.jongseong.replace('ㅎ', '') as Syllable['jongseong'];
}
