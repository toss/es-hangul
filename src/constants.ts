export const COMPLETE_HANGUL_START_CHARCODE = '가'.charCodeAt(0);
export const COMPLETE_HANGUL_END_CHARCODE = '힣'.charCodeAt(0);
export const NUMBER_OF_JONGSUNG = 28;
export const NUMBER_OF_JUNGSUNG = 21;

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

export const 음가가_없는_자음 = 'ㅇ';

export const 한글_자모 = ['기역', '니은', '리을', '미음', '비읍', '시옷', '이응'] as const;
export const 특별한_한글_자모 = ['디귿', '지읒', '치읓', '키읔', '티읕', '피읖', '히읗'] as const;
export const 특별한_한글_자모의_발음 = {
  ㄷ: 'ㅅ',
  ㅈ: 'ㅅ',
  ㅊ: 'ㅅ',
  ㅌ: 'ㅅ',
  ㅎ: 'ㅅ',
  ㅋ: 'ㄱ',
  ㅍ: 'ㅂ',
} as const;

export const 음의_동화_받침 = {
  ㄷ: 'ㅈ',
  ㅌ: 'ㅊ',
  ㄹㅌ: 'ㅊ',
} as const;

export const ㄴㄹ이_덧나는_모음 = ['ㅑ', 'ㅕ', 'ㅛ', 'ㅠ', 'ㅣ', 'ㅒ', 'ㅖ'] as const;
export const ㄴㄹ이_덧나서_받침_ㄴ_변환 = ['ㄱ', 'ㄴ', 'ㄷ', 'ㅁ', 'ㅂ', 'ㅇ'] as const;
export const ㄴㄹ이_덧나서_받침_ㄹ_변환 = ['ㄹ'] as const;

// 19항
export const 자음동화_받침_ㄴ_변환 = ['ㅁ', 'ㅇ', 'ㄱ', 'ㅂ'] as const;

// 18항
export const 비음화_받침_ㅇ_변환 = ['ㄱ', 'ㄲ', 'ㅋ', 'ㄱㅅ', 'ㄹㄱ'] as const;
export const 비음화_받침_ㄴ_변환 = ['ㄷ', 'ㅅ', 'ㅆ', 'ㅈ', 'ㅊ', 'ㅌ', 'ㅎ'] as const;
export const 비음화_받침_ㅁ_변환 = ['ㅂ', 'ㅍ', 'ㄹㅂ', 'ㄹㅍ', 'ㅂㅅ'] as const;

// 12항
export const 발음변환_받침_ㅎ = ['ㅎ', 'ㄴㅎ', 'ㄹㅎ'] as const;
export const 발음변환_받침_ㅎ_발음 = {
  ㄱ: 'ㅋ',
  ㄷ: 'ㅌ',
  ㅈ: 'ㅊ',
  ㅅ: 'ㅆ',
} as const;
export const 발음변환_첫소리_ㅎ = ['ㄱ', 'ㄹㄱ', 'ㄷ', 'ㅂ', 'ㄹㅂ', 'ㅈ', 'ㄴㅈ'] as const;
export const 발음변환_첫소리_ㅎ_발음 = {
  ㄱ: 'ㅋ',
  ㄹㄱ: 'ㅋ',
  ㄷ: 'ㅌ',
  ㅂ: 'ㅍ',
  ㄹㅂ: 'ㅍ',
  ㅈ: 'ㅊ',
  ㄴㅈ: 'ㅊ',
} as const;

// 9항, 10항, 11항
export const 받침_대표음_발음 = {
  ㄲ: 'ㄱ',
  ㅋ: 'ㄱ',
  ㄱㅅ: 'ㄱ',
  ㄹㄱ: 'ㄱ',
  ㅅ: 'ㄷ',
  ㅆ: 'ㄷ',
  ㅈ: 'ㄷ',
  ㅊ: 'ㄷ',
  ㅌ: 'ㄷ',
  ㅍ: 'ㅂ',
  ㅂㅅ: 'ㅂ',
  ㄹㅍ: 'ㅂ',
  ㄴㅈ: 'ㄴ',
  ㄹㅂ: 'ㄹ',
  ㄹㅅ: 'ㄹ',
  ㄹㅌ: 'ㄹ',
  ㄹㅁ: 'ㅁ',
} as const;

// 경음화 23항
export const 된소리_받침_23항 = [
  'ㄱ',
  'ㄲ',
  'ㅋ',
  'ㄱㅅ',
  'ㄹㄱ',
  'ㄷ',
  'ㅅ',
  'ㅆ',
  'ㅈ',
  'ㅊ',
  'ㅌ',
  'ㅂ',
  'ㅍ',
  'ㄹㅂ',
  'ㄹㅍ',
  'ㅂㅅ',
] as const;

export const 된소리 = {
  ㄱ: 'ㄲ',
  ㄷ: 'ㄸ',
  ㅂ: 'ㅃ',
  ㅅ: 'ㅆ',
  ㅈ: 'ㅉ',
} as const;

export const 어간_받침 = ['ㄴ', 'ㄴㅈ', 'ㅁ', 'ㄹㅁ', 'ㄹㅂ', 'ㄹㅌ'] as const;
