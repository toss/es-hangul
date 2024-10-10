export const _JASO_HANGUL_NFD = [...'각힣'.normalize('NFD')].map(char => char.charCodeAt(0)); // NFC 에 정의되지 않은 문자는 포함하지 않음

export const COMPLETE_HANGUL_START_CHARCODE = '가'.charCodeAt(0);
export const COMPLETE_HANGUL_END_CHARCODE = '힣'.charCodeAt(0);

export const NUMBER_OF_JONGSEONG = 28;
export const NUMBER_OF_JUNGSEONG = 21;

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
export const CHOSEONGS = [
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
export const JUNSEONGS = Object.values(DISASSEMBLED_VOWELS_BY_VOWEL);

/**
 * 종성으로 올 수 있는 한글 글자
 */
export const JONGSEONGS = (
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

export const HANGUL_DIGITS = [
  '',
  '만',
  '억',
  '조',
  '경',
  '해',
  '자',
  '양',
  '구',
  '간',
  '정',
  '재',
  '극',
  '항하사',
  '아승기',
  '나유타',
  '불가사의',
  '무량대수',
  '겁',
  '업',
];
export const HANGUL_DIGITS_MAX = HANGUL_DIGITS.length * 4;
export const HANGUL_NUMBERS = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
export const HANGUL_NUMBERS_FOR_DECIMAL = ['영', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
export const HANGUL_CARDINAL = ['', '십', '백', '천'];
