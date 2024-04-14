import { combineHangulCharacter, combineVowels, curriedCombineHangulCharacter } from './combineHangulCharacter';
import { disassembleHangul } from './disassemble';
import { removeLastHangulCharacter } from './removeLastHangulCharacter';
import { canBeChosung, canBeJongsung, canBeJungsung, hasBatchim } from './utils';
import { excludeLastElement, joinString } from './_internal';

export function binaryAssembleHangulCharacters(source: string, nextCharacter: string) {
  const sourceJamo = disassembleHangul(source).split('');

  // source에 모음 뿐이고 다음 글자도 모음
  if (canBeJungsung(sourceJamo[0])) {
    return canBeJungsung(`${source}${nextCharacter}`)
      ? combineVowels(source, nextCharacter)
      : joinString(source, nextCharacter);
  }

  const [_, 마지막_자모] = excludeLastElement(sourceJamo);

  // source가 자음 뿐이고 다음 글자가 모음
  if (sourceJamo.length === 1 && canBeJungsung(nextCharacter)) {
    return combineHangulCharacter(마지막_자모, nextCharacter);
  }

  // 소스가 자음과 모음이 조합된 문자이고 다음 글자도 모음
  if (canBeJungsung(마지막_자모) && canBeJungsung(nextCharacter)) {
    const 모음소스 = `${마지막_자모}${nextCharacter}`;
    return canBeJungsung(모음소스)
      ? combineHangulCharacter(sourceJamo[0], 모음소스)
      : joinString(source, nextCharacter);
  }

  // 마지막 자모가 종성이고 다음 글자는 모음.
  if (canBeChosung(마지막_자모) && canBeJungsung(nextCharacter)) {
    return joinString(removeLastHangulCharacter(source), combineHangulCharacter(마지막_자모, nextCharacter));
  }

  const combineJungsung = curriedCombineHangulCharacter(sourceJamo[0]);
  // 마지막 자모가 모음이고 다음 글자도 모음
  if (canBeJungsung(`${마지막_자모}${nextCharacter}`)) {
    return combineJungsung(combineVowels(마지막_자모, nextCharacter))();
  }

  // 마지막 자모가 모음이고 다음 글자가 자음
  if (canBeJungsung(마지막_자모) && canBeJongsung(nextCharacter)) {
    return combineJungsung(마지막_자모)(nextCharacter);
  }

  const combineJongsung = combineJungsung(sourceJamo[1]);

  // 마지막 자모가 자음이고 다음 문자도 자음이며 겹받침이 가능한 경우
  if (hasBatchim(source) && sourceJamo.length === 3 && canBeJongsung(`${마지막_자모}${nextCharacter}`)) {
    return combineJongsung(`${마지막_자모}${nextCharacter}`);
  }

  return joinString(source, nextCharacter);
}

export function binaryAssembleHangul(source: string, nextCharacter: string) {
  const [rest, lastCharacter] = excludeLastElement(source.split(''));
  return joinString(...rest, binaryAssembleHangulCharacters(lastCharacter, nextCharacter));
}

export function assembleHangul(words: string[]) {
  const disassembled = disassembleHangul(words.join('')).split('');
  return disassembled.reduce(binaryAssembleHangul);
}
