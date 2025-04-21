import type { disassembleCompleteCharacter } from '@/core/disassembleCompleteCharacter';

export type NonUndefined<T> = T extends undefined ? never : T;
export type Nullable<T> = T | null | undefined;
export type Syllable = NonUndefined<ReturnType<typeof disassembleCompleteCharacter>>;
export type ReturnSyllables = {
  current: Syllable;
  next: Syllable;
};
export type NullableReturnSyllables = {
  current: Syllable;
  next: Nullable<Syllable>;
};
