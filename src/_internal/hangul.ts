import assert, { excludeLastElement, isBlank, joinString } from '.';
import { combineHangulCharacter, combineVowels, curriedCombineHangulCharacter } from '../combineHangulCharacter';
import { disassembleHangulToGroups } from '../disassemble';
import { removeLastHangulCharacter } from '../removeLastHangulCharacter';
import { canBeChosung, canBeJongsung, canBeJungsung, hasSingleBatchim } from '../utils';

export function isHangulCharacter(character: string) {
  return /^[가-힣]$/.test(character);
}

export function isHangulAlphabet(character: string) {
  return /^[ㄱ-ㅣ]$/.test(character);
}

/**
 * @name isHangulText
 * @description
 * text를 받으면 해당 text가 한글 문장인지를 구분합니다.
 *
 */
export function isHangulText(text: string): boolean {
  return /^[\가-\힣\s]+$/.test(text);
}
/**
 * @name binaryAssembleHangulAlphabets
 * @description
 * 두 개의 한글 자모를 합칩니다. 완성된 한글 문자는 취급하지 않습니다.
 * @example
 * ```
 * binaryAssembleHangulAlphabets('ㄱ', 'ㅏ') // 가
 * binaryAssembleHangulAlphabets('ㅗ', 'ㅏ') // ㅘ
 * ```
 */
export function binaryAssembleHangulAlphabets(source: string, nextCharacter: string) {
  if (canBeJungsung(`${source}${nextCharacter}`)) {
    return combineVowels(source, nextCharacter);
  }

  const isConsonantSource = canBeJungsung(source) === false;
  if (isConsonantSource && canBeJungsung(nextCharacter)) {
    return combineHangulCharacter(source, nextCharacter);
  }

  return joinString(source, nextCharacter);
}

/**
 * @name linkHangulCharacters
 * @description
 * 연음 법칙을 적용하여 두 개의 한글 문자를 연결합니다.
 */
export function linkHangulCharacters(source: string, nextCharacter: string) {
  const sourceJamo = disassembleHangulToGroups(source)[0];
  const [, lastJamo] = excludeLastElement(sourceJamo);

  return joinString(removeLastHangulCharacter(source), combineHangulCharacter(lastJamo, nextCharacter));
}

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
 * binaryAssembleHangulCharacters('갑', 'ㅅ') // 값
 * binaryAssembleHangulCharacters('깎', 'ㅏ') // 까까
 */
export function binaryAssembleHangulCharacters(source: string, nextCharacter: string) {
  assert(
    isHangulCharacter(source) || isHangulAlphabet(source),
    `Invalid source character: ${source}. Source must be one character.`
  );
  assert(
    isHangulAlphabet(nextCharacter),
    `Invalid next character: ${nextCharacter}. Next character must be one of the chosung, jungsung, or jongsung.`
  );

  const sourceJamos = disassembleHangulToGroups(source)[0];

  const isSingleCharacter = sourceJamos.length === 1;
  if (isSingleCharacter) {
    const sourceCharacter = sourceJamos[0];
    return binaryAssembleHangulAlphabets(sourceCharacter, nextCharacter);
  }

  const [restJamos, lastJamo] = excludeLastElement(sourceJamos);

  const needLinking = canBeChosung(lastJamo) && canBeJungsung(nextCharacter);
  if (needLinking) {
    return linkHangulCharacters(source, nextCharacter);
  }

  const fixConsonant = curriedCombineHangulCharacter;
  const combineJungsung = fixConsonant(restJamos[0]);

  if (canBeJungsung(`${lastJamo}${nextCharacter}`)) {
    return combineJungsung(`${lastJamo}${nextCharacter}`)();
  }

  if (canBeJungsung(lastJamo) && canBeJongsung(nextCharacter)) {
    return combineJungsung(lastJamo)(nextCharacter);
  }

  const fixVowel = combineJungsung;
  const combineJongsung = fixVowel(restJamos[1]);

  const lastConsonant = lastJamo;

  if (hasSingleBatchim(source) && canBeJongsung(`${lastConsonant}${nextCharacter}`)) {
    return combineJongsung(`${lastConsonant}${nextCharacter}`);
  }

  return joinString(source, nextCharacter);
}

/**
 * @name binaryAssembleHangul
 * @description
 * 인자로 받은 한글 문장과 한글 문자 하나를 합성합니다.
 * ```typescript
 * binaryAssembleHangul(
 *   // 한글 문장
 *   source: string
 *   // 한글 문자
 *   nextCharacter: string
 * ): string
 * ```
 * @example
 * binaryAssembleHangul('저는 고양이를 좋아합닏', 'ㅏ') // 저는 고양이를 좋아합니다
 * binaryAssembleHangul('저는 고양이를 좋아합', 'ㅅ') // 저는 고양이를 좋아핪
 * binaryAssembleHangul('저는 고양이를 좋아하', 'ㅏ') // 저는 고양이를 좋아하ㅏ
 */
export function binaryAssembleHangul(source: string, nextCharacter: string) {
  const [rest, lastCharacter] = excludeLastElement(source.split(''));
  const needJoinString = isBlank(lastCharacter) || isBlank(nextCharacter);

  return joinString(
    ...rest,
    needJoinString
      ? joinString(lastCharacter, nextCharacter)
      : binaryAssembleHangulCharacters(lastCharacter, nextCharacter)
  );
}
