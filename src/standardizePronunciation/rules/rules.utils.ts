import { Syllable } from './rules.types';

export function replace받침ㅎ(currentSyllable: Syllable): Syllable['last'] {
  return currentSyllable.last.replace('ㅎ', '') as Syllable['last'];
}
