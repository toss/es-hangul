import { getJongseong } from './getJongseong';

describe('getJongseong', () => {
  it('"값" 단어에서 종성 "ㅄ"을 추출한다.', () => {
    expect(getJongseong('값')).toBe('ㅄ');
  });
  it('"사람" 단어에서 종성 "ㅁ"을 추출한다.', () => {
    expect(getJongseong('사람')).toBe('ㅁ');
  });
  it('"사과" 단어에서 종성 ""을 추출한다.', () => {
    expect(getJongseong('사과')).toBe('');
  });
  it('"ㄴㅈ" 자모 입력에서는 종성 ""을 추출한다.', () => {
    expect(getJongseong('ㄴㅈ')).toBe('');
  });
  it('"리액트" 단어에서 종성 "ㄱ"을 추출한다.', () => {
    expect(getJongseong('리액트')).toBe('ㄱ');
  });
  it('"띄어 쓰기" 문장에서 종성 " "을 추출한다.', () => {
    expect(getJongseong('띄어 쓰기')).toBe(' ');
  });
  it('"파이팅" 단어에서 종성 "ㅇ"을 추출한다.', () => {
    expect(getJongseong('파이팅')).toBe('ㅇ');
  });

  it('keepNonHangul이 false이면 숫자 등 비한글을 제거한다.', () => {
    expect(getJongseong('값123')).toBe('ㅄ');
  });

  it('keepNonHangul이 true이면 숫자 등 비한글을 유지한다.', () => {
    expect(getJongseong('값123', { keepNonHangul: true })).toBe('ㅄ123');
  });
});


