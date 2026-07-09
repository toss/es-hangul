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
});
