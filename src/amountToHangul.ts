export const HANGUL_DIGITS = ['', '만', '억', '조', '경', '해', '자', '양', '구', '간', '정', '재', '극', '항하사', '아승기', '나유타', '불가사의', '무량대수', '겁', '업'];
export const HANGUL_DIGITS_MAX = HANGUL_DIGITS.length * 4;
export const HANGUL_NUMBERS = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
export const HANGUL_CARDINAL = ['', '십', '백', '천'];

// https://ko.dict.naver.com/#/correct/korean/info?seq=602
// https://github.com/crucifyer/koreanCardinalOrdinal
export function amountToHangul(str: string) {
  str = str.replace(/\..*$/, '') // 소수점 지원 안함
    .replace(/[^\d]+/g, ''); // , 표기 등 오류내지 않음
  if(str.length > HANGUL_DIGITS_MAX) {
    throw new Error('convert range exceeded : ' + str);
  }
  const result = [];
  let pronunDigits = true;
  for(let i = 0; i < str.length - 1; i ++) {
    const d = str.length - i - 1;
    if(str[i] > '1' || d % 4 === 0 || i === 0) {
      const tnum = HANGUL_NUMBERS[parseInt(str[i])];
      if(tnum) {
        result.push(tnum);
        pronunDigits = true;
      }
    }
    if(pronunDigits && d % 4 === 0) {
      result.push(HANGUL_DIGITS[d / 4]);
      pronunDigits = false;
    }
    if(str[i] !== '0') {
      result.push(HANGUL_CARDINAL[d % 4]);
    }
  }
  result.push(HANGUL_NUMBERS[parseInt(str[str.length - 1])]);
  return result.join('');
}
