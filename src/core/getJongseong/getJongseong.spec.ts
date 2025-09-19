import { getJongseong } from './getJongseong';

describe('getJongseong', () => {
  it('"한글" 단어에서 종성 "ㄴㄹ"을 추출한다.', () => {
    expect(getJongseong('한글')).toBe('ㄴㄹ');
  });
  it('"값" 단어에서 종성 "ㅄ"을 추출한다.', () => {
    expect(getJongseong('값')).toBe('ㅄ');
  });
  it('"사과" 단어에서 종성 ""(빈 문자열)을 추출한다.', () => {
    expect(getJongseong('사과')).toBe('');
  });
  it('"읽다" 단어에서 종성 "ㄺ"을 추출한다.', () => {
    expect(getJongseong('읽다')).toBe('ㄺ');
  });
  it('"띄어 쓰기" 문장에서 종성만 남긴다.', () => {
    expect(getJongseong('띄어 쓰기')).toBe(' ');
  });
  it('"파이팅" 단어에서 종성 "ㅇ"을 추출한다.', () => {
    expect(getJongseong('파이팅')).toBe('ㅇ');
  });
});


