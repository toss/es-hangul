import { combineHangulCharacter, combineVowels, curriedCombineHangulCharacter } from './combineHangulCharacter';
import { disassembleHangul, disassembleHangulToGroups } from './disassemble';
import { removeLastHangulCharacter } from './removeLastHangulCharacter';
import { canBeChosung, canBeJongsung, canBeJungsung, hasBatchim } from './utils';
import assert, { excludeLastElement, isHangulAlphabet, joinString } from './_internal';

/**
 * @name binaryAssembleHangulCharacters
 * @description
 * 인자로 받은 한글 문자 2개를 합성합니다.
 * ```typescript
 * binaryAssembleHangulCharacters(
 *   // 소스 문자
 *   source: string
 *   // 다음 문자
 *   nextCharacter: string
 * ): string
 * ```
 * @example
 * binaryAssembleHangulCharacters('ㄱ', 'ㅏ') // 가
 * binaryAssembleHangulCharacters('가', 'ㅇ') // 강
 * binaryAssembleHangulCharacters('가', 'ㅂㅅ') // 값
 * binaryAssembleHangulCharacters('깎', 'ㅏ') // 까까
 */
export function binaryAssembleHangulCharacters(source: string, nextCharacter: string) {
  assert(source.length === 1, `Invalid source character: ${source}. Source must be one character.`);
  assert(
    nextCharacter === ' ' || isHangulAlphabet(nextCharacter),
    `Invalid next character: ${nextCharacter}. Next character must be one of the chosung, jungsung, or jongsung.`
  );

  const sourceJamo = disassembleHangulToGroups(source).at(0)!;

  // source에 모음 뿐
  if (canBeJungsung(sourceJamo[0])) {
    return canBeJungsung(`${source}${nextCharacter}`)
      ? combineVowels(source, nextCharacter)
      : joinString(source, nextCharacter);
  }

  const [, lastJamo] = excludeLastElement(sourceJamo);

  // source가 자음 뿐이고 다음 글자가 모음
  if (sourceJamo.length === 1 && canBeJungsung(nextCharacter)) {
    return combineHangulCharacter(lastJamo, nextCharacter);
  }

  // 소스가 자음과 모음이 조합된 문자이고 다음 글자도 모음
  if (canBeJungsung(lastJamo) && canBeJungsung(nextCharacter)) {
    const 모음소스 = `${lastJamo}${nextCharacter}`;
    return canBeJungsung(모음소스)
      ? combineHangulCharacter(sourceJamo[0], 모음소스)
      : joinString(source, nextCharacter);
  }

  // 마지막 자모가 종성이고 다음 글자는 모음.
  if (canBeChosung(lastJamo) && canBeJungsung(nextCharacter)) {
    return joinString(removeLastHangulCharacter(source), combineHangulCharacter(lastJamo, nextCharacter));
  }

  const combineJungsung = curriedCombineHangulCharacter(sourceJamo[0]);
  // 마지막 자모가 모음이고 다음 글자도 모음
  if (canBeJungsung(`${lastJamo}${nextCharacter}`)) {
    return combineJungsung(combineVowels(lastJamo, nextCharacter))();
  }

  // 마지막 자모가 모음이고 다음 글자가 자음
  if (canBeJungsung(lastJamo) && canBeJongsung(nextCharacter)) {
    return combineJungsung(lastJamo)(nextCharacter);
  }

  const combineJongsung = combineJungsung(sourceJamo[1]);

  // 마지막 자모가 자음이고 다음 문자도 자음이며 겹받침이 가능한 경우
  if (hasBatchim(source) && sourceJamo.length === 3 && canBeJongsung(`${lastJamo}${nextCharacter}`)) {
    return combineJongsung(`${lastJamo}${nextCharacter}`);
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
