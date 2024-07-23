import assert, { excludeLastElement, isBlank, joinString } from '.';
import { canBeChoseong, canBeJungseong, canBeJongseong } from '../canBe';
import { combineHangulCharacter, combineVowels, curriedCombineHangulCharacter } from '../combineHangulCharacter';
import { disassembleToGroups } from '../disassemble';
import { removeLastHangulCharacter } from '../removeLastHangulCharacter';
import { hasSingleBatchim } from '../utils';

export function isHangulCharacter(character: string) {
  return /^[가-힣]$/.test(character);
}

export function isHangulAlphabet(character: string) {
  return /^[ㄱ-ㅣ]$/.test(character);
}

export function isHangul(actual: unknown): actual is string {
  return typeof actual === 'string' && /^[가-힣ㄱ-ㅣ\s]+$/.test(actual);
}

export function assertHangul(actual: unknown, message?: string): asserts actual is string {
  assert(isHangul(actual), message || `${JSON.stringify(actual)} is not a valid hangul string`);
}

export function parseHangul(actual: unknown): string {
  assertHangul(actual);
  return actual;
}

type SafeParseSuccess = {
  success: true;
  data: string;
  error?: never;
};

type SafeParseError = {
  success: false;
  error: unknown;
  data?: never;
};

export function safeParseHangul(actual: unknown): SafeParseSuccess | SafeParseError {
  try {
    const parsedHangul = parseHangul(actual);
    return { success: true, data: parsedHangul };
  } catch (error) {
    return { success: false, error };
  }
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
  if (canBeJungseong(`${source}${nextCharacter}`)) {
    return combineVowels(source, nextCharacter);
  }

  const isConsonantSource = canBeJungseong(source) === false;
  if (isConsonantSource && canBeJungseong(nextCharacter)) {
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
  const sourceJamo = disassembleToGroups(source)[0];
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
    `Invalid next character: ${nextCharacter}. Next character must be one of the choseong, jungseong, or jongseong.`
  );

  const sourceJamos = disassembleToGroups(source)[0];

  const isSingleCharacter = sourceJamos.length === 1;
  if (isSingleCharacter) {
    const sourceCharacter = sourceJamos[0];
    return binaryAssembleHangulAlphabets(sourceCharacter, nextCharacter);
  }

  const [restJamos, lastJamo] = excludeLastElement(sourceJamos);
  const secondaryLastJamo = excludeLastElement(restJamos)[1];

  const needLinking = canBeChoseong(lastJamo) && canBeJungseong(nextCharacter);
  if (needLinking) {
    return linkHangulCharacters(source, nextCharacter);
  }

  const fixConsonant = curriedCombineHangulCharacter;
  const combineJungseong = fixConsonant(restJamos[0]);

  if (canBeJungseong(`${lastJamo}${nextCharacter}`)) {
    return combineJungseong(`${lastJamo}${nextCharacter}`)();
  }

  if (canBeJungseong(`${secondaryLastJamo}${lastJamo}`) && canBeJongseong(nextCharacter)) {
    return combineJungseong(`${secondaryLastJamo}${lastJamo}`)(nextCharacter);
  }

  if (canBeJungseong(lastJamo) && canBeJongseong(nextCharacter)) {
    return combineJungseong(lastJamo)(nextCharacter);
  }

  const fixVowel = combineJungseong;

  const combineJongseong = fixVowel(
    canBeJungseong(`${restJamos[1]}${restJamos[2]}`) ? `${restJamos[1]}${restJamos[2]}` : restJamos[1]
  );

  const lastConsonant = lastJamo;

  if (hasSingleBatchim(source) && canBeJongseong(`${lastConsonant}${nextCharacter}`)) {
    return combineJongseong(`${lastConsonant}${nextCharacter}`);
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
