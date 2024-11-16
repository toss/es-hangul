import { disassembleCompleteCharacter } from '@/disassembleCompleteCharacter';
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

const 로_조사 = new Set<JosaOption>(['으로/로', '으로서/로서', '으로써/로써', '으로부터/로부터']);

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

  if (josa === '와/과') {
    return josa.split('/')[has받침 ? 1 : 0] as ExtractJosaOption<T>;
  }

  const 마지막글자 = word[word.length - 1];
  const isEndsWith이 = 마지막글자 === '이';

  if (josa === '이에요/예요' && isEndsWith이) {
    return josa.split('/')[1] as ExtractJosaOption<T>;
  }

  const is종성ㄹ = has받침 && disassembleCompleteCharacter(마지막글자)?.jongseong === 'ㄹ';
  const isCaseOf로 = has받침 && is종성ㄹ && 로_조사.has(josa);

  if (isCaseOf로) {
    return josa.split('/')[has받침 ? 1 : 0] as ExtractJosaOption<T>;
  }

  return josa.split('/')[index] as ExtractJosaOption<T>;
}
