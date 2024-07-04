/**
 * @name extractHangul
 * @description
 * 문자열을 입력받고 한글만 추출해 반환합니다.
 *
 * @param {string} chars 모든 문자열
 *
 * @example
 * extractHangul('안녕하세요1234abc') // '안녕하세요'
 * extractHangul('abcde') // ''
 * extractHangul('안녕하세요ㄱㄴ') // '안녕하세요ㄱㄴ'
 * extractHangul('안녕하세요    만나서 반갑습니다') // '안녕하세요    만나서 반갑습니다'
 * extractHangul('가나다!-29~라마바.,,사') // '가나다라마바사'
 */

export function extractHangul(str: string): string {
  return str.replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣\s]+/g, '');
}
