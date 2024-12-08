import { convertQwertyToHangul } from './convertQwertyToHangul';

describe('convertQwertyToHangul', () => {
  it('영어 알파벳을 한글로 합성한다.', () => {
    expect(convertQwertyToHangul('abc')).toBe('뮻');
    expect(convertQwertyToHangul('vmfhsxmdpsem')).toBe('프론트엔드');
  });

  it('쌍/자모음에 대응하지 않는 영어 알파벳을 한글로 합성한다.', () => {
    expect(convertQwertyToHangul('ABC')).toBe('뮻');
    expect(convertQwertyToHangul('VMFHSXM')).toBe('프론트');
  });

  it('영어 알파벳은 한글로 합성하고, 한글 음절은 유지한다.', () => {
    expect(convertQwertyToHangul('vm론트')).toBe('프론트');
  });

  it('인자가 한글 음소면 한글로 합성한다.', () => {
    expect(convertQwertyToHangul('ㅍㅡㄹㅗㄴㅌㅡ')).toBe('프론트');
  });

  it('영문 대문자는 쌍자/모음에 대응하며 한글로 합성한다.', () => {
    expect(convertQwertyToHangul('RㅏㄱEㅜrl')).toBe('깍뚜기');
    expect(convertQwertyToHangul('ㅇPdml')).toBe('예의');
  });

  it('빈 문자열은 빈 문자열을 반환한다.', () => {
    expect(convertQwertyToHangul('')).toBe('');
  });
});
