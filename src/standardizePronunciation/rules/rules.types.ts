import { disassembleCompleteHangulCharacter } from '../../disassembleCompleteHangulCharacter';

export type NonUndefined<T> = T extends undefined ? never : T;
export type Nullable<T> = T | null | undefined;
export type Syllable = NonUndefined<ReturnType<typeof disassembleCompleteHangulCharacter>>;
export type ReturnSyllables = {
  current: Syllable;
  next: Syllable;
};
export type NullableReturnSyllables = {
  current: Syllable;
  next: Nullable<Syllable>;
};
