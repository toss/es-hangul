import { getChoseong } from './getChoseong';

describe('getChoseong', () => {
  it('"사과" 단어에서 초성 "ㅅㄱ"을 추출한다.', () => {
    expect(getChoseong('사과')).toBe('ㅅㄱ');
  });
  it('"프론트엔드" 단어에서 초성 "ㅍㄹㅌㅇㄷ"을 추출한다.', () => {
    expect(getChoseong('프론트엔드')).toBe('ㅍㄹㅌㅇㄷ');
  });
  it('"ㄴㅈ" 문자에서 초성 "ㄴㅈ"을 추출한다.', () => {
    expect(getChoseong('ㄴㅈ')).toBe('ㄴㅈ');
  });
  it('"리액트" 단어에서 초성 "ㄹㅇㅌ"을 추출한다.', () => {
    expect(getChoseong('리액트')).toBe('ㄹㅇㅌ');
  });

  it('"띄어 쓰기" 문장에서 초성 "ㄸㅇ ㅆㄱ"을 추출한다.', () => {
    expect(getChoseong('띄어 쓰기')).toBe('ㄸㅇ ㅆㄱ');
  });

  it('keepNonHangul이 false이면 숫자 등 비한글을 제거한다.', () => {
    expect(getChoseong('네이버123')).toBe('ㄴㅇㅂ');
  });

  it('keepNonHangul이 true이면 숫자 등 비한글을 유지한다.', () => {
    expect(getChoseong('네이버123', { keepNonHangul: true })).toBe('ㄴㅇㅂ123');
  });

  describe('한글이 아닌 문자 처리', () => {
    it('영어는 제거한다.', () => {
      expect(getChoseong('apple')).toBe('');
      expect(getChoseong('사과apple')).toBe('ㅅㄱ');
    });

    it('특수문자는 제거한다.', () => {
      expect(getChoseong('사과!@#')).toBe('ㅅㄱ');
    });

    it('한글이 아닌 다른 언어는 제거한다.', () => {
      expect(getChoseong('りんご')).toBe('');
      expect(getChoseong('中國')).toBe('');
    });

    it('빈 문자열은 빈 문자열을 반환한다.', () => {
      expect(getChoseong('')).toBe('');
    });

    it('keepNonHangul이 true이면 영어와 특수문자를 유지한다.', () => {
      expect(getChoseong('사과apple', { keepNonHangul: true })).toBe('ㅅㄱapple');
      expect(getChoseong('사과!@#', { keepNonHangul: true })).toBe('ㅅㄱ!@#');
    });
  });
});
