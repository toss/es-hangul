import { extractHangul } from './extractHangul';

describe('extractHangul', () => {
  it('숫자와 알파벳과 특수문자를 제외한 한글 추출', () => {
    expect(extractHangul('안녕하세요1234abc!@#')).toBe('안녕하세요');
  });

  it('한글이 없는 문자열', () => {
    expect(extractHangul('1234abc')).toBe('');
  });

  it('한글과 공백을 제외한 다른 문자는 제거', () => {
    expect(extractHangul('한글과 영어가 섞인 문장입니다. Hello!')).toBe('한글과 영어가 섞인 문장입니다 ');
  });

  it('escape 문자열 유지', () => {
    expect(extractHangul('한글과\n\t줄바꿈')).toBe('한글과\n\t줄바꿈');
  });

  it('모음은 제거하지 않음', () => {
    expect(extractHangul('ㅠㅠ')).toBe('ㅠㅠ');
  });

  it('자음은 제거하지 않음', () => {
    expect(extractHangul('ㄱㄴㄱㄴ')).toBe('ㄱㄴㄱㄴ');
  });
});
