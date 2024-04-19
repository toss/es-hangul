import { describe, expect, it } from 'vitest';
import { chosungIncludes } from './chosungIncludes';

describe('chosungIncludes', () => {
  it('should return true when "ㅍㄹㅌ" is entered for searching "프론트엔드"', () => {
    expect(chosungIncludes('프론트엔드', 'ㅍㄹㅌ')).toBe(true);
  });

  it('should return true when "ㅍㄹㅌ" is entered for searching "00프론트엔드"', () => {
    expect(chosungIncludes('00프론트엔드', 'ㅍㄹㅌ')).toBe(true);
  });

  it('should return false when "ㅍㅌ" is entered for searching "프론트엔드"', () => {
    expect(chosungIncludes('프론트엔드', 'ㅍㅌ')).toBe(false);
  });

  it('should return true when "ㅍㄹㅌㅇㄷㄱㅂㅈ" is entered for searching "프론트엔드 개발자"', () => {
    expect(chosungIncludes('프론트엔드 개발자', 'ㅍㄹㅌㅇㄷㄱㅂㅈ')).toBe(true);
  });

  it('should return true when "ㅍㄹㅌㅇㄷ ㄱㅂㅈ" is entered for searching "프론트엔드 개발자"', () => {
    expect(chosungIncludes('프론트엔드 개발자', 'ㅍㄹㅌㅇㄷ ㄱㅂㅈ')).toBe(true);
  });

  it('should return true when "ㅍㄹㅌㅇㄷ ㄱㅂㅈ" is entered for searching " "', () => {
    expect(chosungIncludes('프론트엔드 개발자', ' ')).toBe(false);
  });

  it('should return false when "푸롴트" is entered for searching "프론트엔드" as it does not only include the initial consonants.', () => {
    expect(chosungIncludes('프론트엔드', '푸롴트')).toBe(false);
  });
});
