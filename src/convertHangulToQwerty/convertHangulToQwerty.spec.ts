import { convertHangulToQwerty } from './convertHangulToQwerty';

describe('convertHangulToQwerty', () => {
  it('한글을 알파벳으로 변환한다.', () => {
    expect(convertHangulToQwerty('뮻')).toBe('abc');
    expect(convertHangulToQwerty('겨노')).toBe('rush');
    expect(convertHangulToQwerty('님노')).toBe('slash');
    expect(convertHangulToQwerty('ㅙㅜㅎ 햐ㅣ애ㅜㅎ')).toBe('hong gildong');
  });

  it('쌍자음 및 이중모음도 그에 대응되는 영문 알파벳으로 변환한다.', () => {
    expect(convertHangulToQwerty('쨰ㅉ')).toBe('WOW');
    expect(convertHangulToQwerty('빠짜따까싸')).toBe('QkWkEkRkTk');
    expect(convertHangulToQwerty('과궈괴귀긔')).toBe('rhkrnjrhlrnlrml');
  });

  it('영문, 숫자 등 한글이 아닌 글자는 그대로 유지한다.', () => {
    expect(convertHangulToQwerty('FE개발!')).toBe('FEroqkf!');
    expect(convertHangulToQwerty('ㄴ대ㅕㅣ, ㅏㅐㄱㄷㅁ')).toBe('seoul, korea');
  });

  it('한글 음소 또한 알파벳으로 변환한다.', () => {
    expect(convertHangulToQwerty('ㅍㅡㄹㅗㄴㅌㅡ')).toBe('vmfhsxm');
    expect(convertHangulToQwerty('RㅏㄱEㅜrl')).toBe('RkrEnrl');
    expect(convertHangulToQwerty('ㅇPdml')).toBe('dPdml');
  });

  it('빈 문자열은 빈 문자열을 반환한다.', () => {
    expect(convertHangulToQwerty('')).toBe('');
  });
});
