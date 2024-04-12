import { disassembleCompleteHangulCharacter } from './disassembleCompleteHangulCharacter';
import { hasBatchim } from './utils';

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
  | '으로부터/로부터';

const 로_조사: JosaOption[] = ['으로/로', '으로서/로서', '으로써/로써', '으로부터/로부터'];

export function josa(word: string, josa: JosaOption): string {
  const wordWithoutLastBracket = removeLast완전한괄호(word);

  if (wordWithoutLastBracket.length === 0) {
    return word;
  }

  return word + josaPicker(wordWithoutLastBracket, josa);
}

josa.pick = josaPicker;

function josaPicker(word: string, josa: JosaOption): string {
  const wordWithoutLastBracket = removeLast완전한괄호(word);

  const has받침 = hasBatchim(wordWithoutLastBracket);
  let index = has받침 ? 0 : 1;
  const lastChar = wordWithoutLastBracket[wordWithoutLastBracket.length - 1];

  const is종성ㄹ = disassembleCompleteHangulCharacter(lastChar!)?.last === 'ㄹ';

  const isCaseOf로 = has받침 && is종성ㄹ && 로_조사.includes(josa);

  if (josa === '와/과' || isCaseOf로) {
    index = index === 0 ? 1 : 0;
  }

  const isEndsWith이 = lastChar === '이';

  if (josa === '이에요/예요' && isEndsWith이) {
    index = 1;
  }

  return josa.split('/')[index]!;
}

function removeLast완전한괄호(word: string) {
  const endsWith완전한괄호 = checkEndsWith완전한괄호(word);

  if (!endsWith완전한괄호) {
    return word;
  }

  return word.replace(/\([^()]*\)(?=[^()]*$)/, '').trim();
}

function checkEndsWith완전한괄호(word: string) {
  return /\([^)]*\)$/.test(word);
}
