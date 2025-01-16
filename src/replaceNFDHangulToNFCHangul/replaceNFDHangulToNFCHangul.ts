import { ASSEMBLED_JONSEOUNG, CHOSEONGS, DISASSEMBLED_VOWELS_BY_VOWEL } from '../_internal/constants';
import { combineCharacter } from '../combineCharacter';
import { includeNFDHangul } from '../includeNFDHangul';
import { includeOldHangul } from '../includeOldHangul';

const nfdChoseongMap = Object.fromEntries(CHOSEONGS.map((choseong, index) => [4352 + index, choseong]));

const nfdVowelMap = Object.fromEntries(
  Object.keys(DISASSEMBLED_VOWELS_BY_VOWEL).map((vowel, index) => [
    4449 + index,
    DISASSEMBLED_VOWELS_BY_VOWEL[vowel as keyof typeof DISASSEMBLED_VOWELS_BY_VOWEL],
  ])
);

const nfdJongseongMap = Object.fromEntries(
  ASSEMBLED_JONSEOUNG.filter(str => Boolean(str)).map((jongseong, index) => [4520 + index, jongseong])
);

export class IrreplaceableOldHangulError extends Error {
  constructor(str: string) {
    super(`Irreplaceable old hangul character found: ${str}`);
  }
}

export function replaceNFDHangulToNFCHangul(str: string): string {
  if (!includeNFDHangul(str)) {
    return str;
  }

  if (includeOldHangul(str)) {
    throw new IrreplaceableOldHangulError(str);
  }

  const nfdChars = Array.from(str);
  const charComponents: string[] = [];

  let chosung = '';
  let jungsung = '';
  let jongsung = '';

  for (const char of nfdChars) {
    const charCode = char.charCodeAt(0);

    if (Object.keys(nfdChoseongMap).includes(charCode.toString())) {
      if (chosung || jungsung) {
        // 이전에 입력한 초성이 이미 있다면
        if (chosung && jungsung) {
          // 종성이 없는 경우.
          charComponents.push(combineCharacter(chosung, jungsung, ''));
        } else {
          // 초성이 연속으로 입력된 경우.
          charComponents.push(chosung);
        }
      }

      // 이전에 입력한 초성이 없다면
      chosung = nfdChoseongMap[charCode];
      jungsung = '';
      jongsung = '';

      continue;
    }

    if (Object.keys(nfdVowelMap).includes(charCode.toString())) {
      if (jungsung) {
        // 이전에 입력한 중성이 이미 있다면
        if (chosung) {
          // 종성이 없는 경우.
          charComponents.push(combineCharacter(chosung, nfdVowelMap[charCode], ''));
        } else {
          // 중성이 연속으로 입력된 경우.
          charComponents.push(nfdVowelMap[charCode]);
        }

        chosung = '';
        jungsung = '';
        jongsung = '';
      }

      // 이전에 입력한 중성이 없다면
      jungsung = nfdVowelMap[charCode];
      continue;
    }

    if (Object.keys(nfdJongseongMap).includes(charCode.toString())) {
      jongsung = nfdJongseongMap[charCode];

      if (chosung && jungsung) {
        charComponents.push(combineCharacter(chosung, jungsung, jongsung));
      } else if (chosung && !jungsung) {
        charComponents.push(chosung);
        charComponents.push(jongsung);
      } else {
        charComponents.push(jongsung);
      }

      chosung = '';
      jungsung = '';
      jongsung = '';

      continue;
    }

    if (chosung || jungsung) {
      if (chosung && jungsung) {
        charComponents.push(combineCharacter(chosung, jungsung, ''));
      } else {
        charComponents.push(chosung || jungsung);
      }
    }

    charComponents.push(char);
    chosung = '';
    jungsung = '';
    jongsung = '';
  }

  if (chosung && jungsung && !jongsung) {
    charComponents.push(combineCharacter(chosung, jungsung, ''));
  } else if (chosung && jungsung && jongsung) {
    charComponents.push(combineCharacter(chosung, jungsung, jongsung));
  } else {
    [chosung, jungsung, jongsung].forEach(char => {
      if (char) {
        charComponents.push(char);
      }
    });
  }

  return charComponents.join('');
}
