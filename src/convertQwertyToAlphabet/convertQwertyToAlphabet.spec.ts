import { convertQwertyToAlphabet } from './convertQwertyToAlphabet';

describe('convertQwertyToAlphabet', () => {
  it('영어 알파벳을 한글 음소로 바꾼다.', () => {
    expect(convertQwertyToAlphabet('abc')).toBe('ㅁㅠㅊ');
  });

  it('쌍/자모음에 대응하지 않는 영어 알파벳을 한글 음소로 바꾼다.', () => {
    expect(convertQwertyToAlphabet('ABC')).toBe('ㅁㅠㅊ');
  });

  it('영어 알파벳은 한글 음소로 바꾸고, 한글 음절은 유지한다.', () => {
    expect(convertQwertyToAlphabet('vm론트')).toBe('ㅍㅡ론트');
  });

  it('분해된 한글 음소는 유지한다.', () => {
    expect(convertQwertyToAlphabet('ㅍㅡㄹㅗㄴㅌㅡ')).toBe('ㅍㅡㄹㅗㄴㅌㅡ');
  });

  it('영어 알파벳이 아닌 입력은 유지한다.', () => {
    expect(convertQwertyToAlphabet('4월/20dlf!')).toBe('4월/20ㅇㅣㄹ!');
  });

  it('영문 대문자는 쌍자/모음으로 바꾼다.', () => {
    expect(convertQwertyToAlphabet('RㅏㄱEㅜrl')).toBe('ㄲㅏㄱㄸㅜㄱㅣ');
    expect(convertQwertyToAlphabet('ㅇPdml')).toBe('ㅇㅖㅇㅡㅣ');
  });

  it('빈 문자열은 빈 문자열을 반환한다.', () => {
    expect(convertQwertyToAlphabet('')).toBe('');
  });
});
