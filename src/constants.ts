export const COMPLETE_HANGUL_START_CHARCODE = '가'.charCodeAt(0);
export const COMPLETE_HANGUL_END_CHARCODE = '힣'.charCodeAt(0);
export const NUMBER_OF_JONGSUNG = 28;
export const NUMBER_OF_JUNGSUNG = 21;

const _JASO_HANGUL_NFD = [...'각힣'.normalize('NFD')].map(char => char.charCodeAt(0)); // NFC 에 정의되지 않은 문자는 포함하지 않음
export const JASO_HANGUL_NFD = {
  START_CHOSEONG: _JASO_HANGUL_NFD[0], // ㄱ
  START_JUNGSEONG: _JASO_HANGUL_NFD[1], // ㅏ
  START_JONGSEONG: _JASO_HANGUL_NFD[2], // ㄱ
  END_CHOSEONG: _JASO_HANGUL_NFD[3], // ㅎ
  END_JUNGSEONG: _JASO_HANGUL_NFD[4], // ㅣ
  END_JONGSEONG: _JASO_HANGUL_NFD[5], // ㅎ
}

/**
 * ㄱ -> 'ㄱ'
 * ㄳ -> 'ㄱㅅ' 으로 나눈다.
 */
export const DISASSEMBLED_CONSONANTS_BY_CONSONANT = {
  // 종성이 없는 경우 '빈' 초성으로 관리하는 것이 편리하여, 빈 문자열도 포함한다.
  '': '',
  ㄱ: 'ㄱ',
  ㄲ: 'ㄲ',
  ㄳ: 'ㄱㅅ',
  ㄴ: 'ㄴ',
  ㄵ: 'ㄴㅈ',
  ㄶ: 'ㄴㅎ',
  ㄷ: 'ㄷ',
  ㄸ: 'ㄸ',
  ㄹ: 'ㄹ',
  ㄺ: 'ㄹㄱ',
  ㄻ: 'ㄹㅁ',
  ㄼ: 'ㄹㅂ',
  ㄽ: 'ㄹㅅ',
  ㄾ: 'ㄹㅌ',
  ㄿ: 'ㄹㅍ',
  ㅀ: 'ㄹㅎ',
  ㅁ: 'ㅁ',
  ㅂ: 'ㅂ',
  ㅃ: 'ㅃ',
  ㅄ: 'ㅂㅅ',
  ㅅ: 'ㅅ',
  ㅆ: 'ㅆ',
  ㅇ: 'ㅇ',
  ㅈ: 'ㅈ',
  ㅉ: 'ㅉ',
  ㅊ: 'ㅊ',
  ㅋ: 'ㅋ',
  ㅌ: 'ㅌ',
  ㅍ: 'ㅍ',
  ㅎ: 'ㅎ',
} as const;

export const DISASSEMBLED_VOWELS_BY_VOWEL = {
  ㅏ: 'ㅏ',
  ㅐ: 'ㅐ',
  ㅑ: 'ㅑ',
  ㅒ: 'ㅒ',
  ㅓ: 'ㅓ',
  ㅔ: 'ㅔ',
  ㅕ: 'ㅕ',
  ㅖ: 'ㅖ',
  ㅗ: 'ㅗ',
  ㅘ: 'ㅗㅏ',
  ㅙ: 'ㅗㅐ',
  ㅚ: 'ㅗㅣ',
  ㅛ: 'ㅛ',
  ㅜ: 'ㅜ',
  ㅝ: 'ㅜㅓ',
  ㅞ: 'ㅜㅔ',
  ㅟ: 'ㅜㅣ',
  ㅠ: 'ㅠ',
  ㅡ: 'ㅡ',
  ㅢ: 'ㅡㅣ',
  ㅣ: 'ㅣ',
} as const;

/**
 * 초성으로 올 수 있는 한글 글자
 */
export const HANGUL_CHARACTERS_BY_FIRST_INDEX = [
  'ㄱ',
  'ㄲ',
  'ㄴ',
  'ㄷ',
  'ㄸ',
  'ㄹ',
  'ㅁ',
  'ㅂ',
  'ㅃ',
  'ㅅ',
  'ㅆ',
  'ㅇ',
  'ㅈ',
  'ㅉ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
] as const;

/**
 * 중성으로 올 수 있는 한글 글자
 */
export const HANGUL_CHARACTERS_BY_MIDDLE_INDEX = Object.values(DISASSEMBLED_VOWELS_BY_VOWEL);

/**
 * 종성으로 올 수 있는 한글 글자
 */
export const HANGUL_CHARACTERS_BY_LAST_INDEX = (
  [
    '',
    'ㄱ',
    'ㄲ',
    'ㄳ',
    'ㄴ',
    'ㄵ',
    'ㄶ',
    'ㄷ',
    'ㄹ',
    'ㄺ',
    'ㄻ',
    'ㄼ',
    'ㄽ',
    'ㄾ',
    'ㄿ',
    'ㅀ',
    'ㅁ',
    'ㅂ',
    'ㅄ',
    'ㅅ',
    'ㅆ',
    'ㅇ',
    'ㅈ',
    'ㅊ',
    'ㅋ',
    'ㅌ',
    'ㅍ',
    'ㅎ',
  ] as const
).map(consonant => DISASSEMBLED_CONSONANTS_BY_CONSONANT[consonant]);

/**
 * qwerty 키보드 자판의 대소문자를 구분한 영어 알파벳을 한글 음소와 맵핑한 객체
 */
export const QWERTY_KEYBOARD_MAP = {
  q: 'ㅂ',
  Q: 'ㅃ',
  w: 'ㅈ',
  W: 'ㅉ',
  e: 'ㄷ',
  E: 'ㄸ',
  r: 'ㄱ',
  R: 'ㄲ',
  t: 'ㅅ',
  T: 'ㅆ',
  y: 'ㅛ',
  Y: 'ㅛ',
  u: 'ㅕ',
  U: 'ㅕ',
  i: 'ㅑ',
  I: 'ㅑ',
  o: 'ㅐ',
  O: 'ㅒ',
  p: 'ㅔ',
  P: 'ㅖ',
  a: 'ㅁ',
  A: 'ㅁ',
  s: 'ㄴ',
  S: 'ㄴ',
  d: 'ㅇ',
  D: 'ㅇ',
  f: 'ㄹ',
  F: 'ㄹ',
  g: 'ㅎ',
  G: 'ㅎ',
  h: 'ㅗ',
  H: 'ㅗ',
  j: 'ㅓ',
  J: 'ㅓ',
  k: 'ㅏ',
  K: 'ㅏ',
  l: 'ㅣ',
  L: 'ㅣ',
  z: 'ㅋ',
  Z: 'ㅋ',
  x: 'ㅌ',
  X: 'ㅌ',
  c: 'ㅊ',
  C: 'ㅊ',
  v: 'ㅍ',
  V: 'ㅍ',
  b: 'ㅠ',
  B: 'ㅠ',
  n: 'ㅜ',
  N: 'ㅜ',
  m: 'ㅡ',
  M: 'ㅡ',
} as const;

export const 중성_알파벳_발음 = {
  // ------- 단모음
  ㅏ: 'a',
  ㅓ: 'eo',
  ㅗ: 'o',
  ㅜ: 'u',
  ㅡ: 'eu',
  ㅣ: 'i',
  ㅐ: 'ae',
  ㅔ: 'e',
  ㅚ: 'oe',
  ㅟ: 'wi',
  // -------
  // ------- 이중모음
  ㅑ: 'ya',
  ㅕ: 'yeo',
  ㅛ: 'yo',
  ㅠ: 'yu',
  ㅒ: 'yae',
  ㅖ: 'ye',
  ㅘ: 'wa',
  ㅙ: 'wae',
  ㅝ: 'wo',
  ㅞ: 'we',
  ㅢ: 'ui',
} as const;

export const 초성_알파벳_발음 = {
  // ------- 파열음
  ㄱ: 'g',
  ㄲ: 'kk',
  ㅋ: 'k',
  ㄷ: 'd',
  ㄸ: 'tt',
  ㅌ: 't',
  ㅂ: 'b',
  ㅃ: 'pp',
  ㅍ: 'p',
  // -------
  // ------- 파찰음
  ㅈ: 'j',
  ㅉ: 'jj',
  ㅊ: 'ch',
  // -------
  // ------- 마찰음
  ㅅ: 's',
  ㅆ: 'ss',
  ㅎ: 'h',
  // -------
  // ------- 비음
  ㄴ: 'n',
  ㅁ: 'm',
  ㅇ: '',
  // -------
  // ------- 유음
  ㄹ: 'r',
} as const;

export const 종성_알파벳_발음 = {
  ㄱ: 'k',
  ㄴ: 'n',
  ㄷ: 't',
  ㄹ: 'l',
  ㅁ: 'm',
  ㅂ: 'p',
  ㅇ: 'ng',
  '': '',
} as const;
