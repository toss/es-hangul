import { describe, expect, it } from 'vitest';
import { convertAlphabetToHangul } from './convertAlphabetToHangul ';

describe('convertAlphabetToHangul', () => {
  it('알파벳을 한글 타자로 바꾼다.', () => {
    expect(convertAlphabetToHangul('abc')).toBe('ㅁㅠㅊ');
  });

  it('쌍/자모음에 대응하지 않는 알파벳을 한글 타자로 바꾼다.', () => {
    expect(convertAlphabetToHangul('ABC')).toBe('ㅁㅠㅊ');
  });

  it('한글 글자는 한글 자/모로 바꾼다.', () => {
    expect(convertAlphabetToHangul('vm론트')).toBe('ㅍㅡㄹㅗㄴㅌㅡ');
  });

  it('한글과 영문이 아닌 입력은 유지한다.', () => {
    expect(convertAlphabetToHangul('4월 / 20dlf!')).toBe('4ㅇㅜㅓㄹ / 20ㅇㅣㄹ!');
  });

  it('영문 대문자는 쌍자/모음으로 바꾼다.', () => {
    expect(convertAlphabetToHangul('RㅏㄱEㅜrl')).toBe('ㄲㅏㄱㄸㅜㄱㅣ');
    expect(convertAlphabetToHangul('ㅇPdml')).toBe('ㅇㅖㅇㅡㅣ');
  });

  it('빈 문자열은 빈 문자열을 반환한다.', () => {
    expect(convertAlphabetToHangul('')).toBe('');
  });
});
