import { disassembleCompleteCharacter } from '@/core/disassembleCompleteCharacter';
import { hasBatchim } from '../hasBatchim';

type JosaOption =
  | '이/가'
  | '을/를'
  | '은/는'
  | '으로/로'
  | '와/과'
  | '이나/나'
  | '이란/란'
  | '아/야'
  | '이랑/랑'
  | '이에요/예요'
  | '으로서/로서'
  | '으로써/로써'
  | '으로부터/로부터'
  | '이라/라';

const 로_조사: JosaOption[] = ['으로/로', '으로서/로서', '으로써/로써', '으로부터/로부터'];

type ExtractJosaOption<T> = T extends `${infer A}/${infer B}` ? A | B : never;

export function josa<T extends string, U extends JosaOption>(word: T, josa: U): `${T}${ExtractJosaOption<U>}` {
  if (word.length === 0) {
    return word as `${T}${ExtractJosaOption<U>}`;
  }

  return (word + josaPicker(word, josa)) as `${T}${ExtractJosaOption<U>}`;
}

josa.pick = josaPicker;

function josaPicker<T extends JosaOption>(word: string, josa: T): ExtractJosaOption<T> {
  if (word.length === 0) {
    return josa.split('/')[0] as ExtractJosaOption<T>;
  }

  const has받침 = hasBatchim(word);
  let index = has받침 ? 0 : 1;

  const is종성ㄹ = has받침 && disassembleCompleteCharacter(word[word.length - 1])?.jongseong === 'ㄹ';

  const isCaseOf로 = has받침 && is종성ㄹ && 로_조사.includes(josa);

  if (josa === '와/과' || isCaseOf로) {
    index = index === 0 ? 1 : 0;
  }

  return josa.split('/')[index] as ExtractJosaOption<T>;
}
