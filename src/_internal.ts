import {
  HANGUL_CHARACTERS_BY_FIRST_INDEX,
  HANGUL_CHARACTERS_BY_LAST_INDEX,
  HANGUL_CHARACTERS_BY_MIDDLE_INDEX,
} from './constants';
import { canBeChosung, canBeJongsung, canBeJungsung } from './utils';

export function excludeLastElement(array: string[]): [string[], string] {
  const lastElement = array.at(-1);
  return [array.slice(0, -1), lastElement ?? ''];
}

export function joinString(...args: string[]) {
  return args.join('');
}

export function isHangulAlphabet(
  character: string
): character is
  | (typeof HANGUL_CHARACTERS_BY_FIRST_INDEX)[number]
  | (typeof HANGUL_CHARACTERS_BY_MIDDLE_INDEX)[number]
  | (typeof HANGUL_CHARACTERS_BY_LAST_INDEX)[number] {
  return [canBeChosung, canBeJungsung, canBeJongsung].some(predicate => predicate(character) === true);
}

export default function assert(condition: boolean, errorMessage?: string): asserts condition {
  if (condition === false) {
    throw new Error(errorMessage ?? 'Invalid condition');
  }
}
