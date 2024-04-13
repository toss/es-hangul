import { describe, expect, it } from 'vitest';
import { canBeChosung, canBeJongsung, canBeJungsung, getFirstConsonants, hasBatchim } from './utils';

describe('hasBatchim', () => {
  it('should return true for the character "값"', () => {
    expect(hasBatchim('값')).toBe(true);
  });
  it('should return true for the character "공"', () => {
    expect(hasBatchim('공')).toBe(true);
  });
  it('should return false for the character "토"', () => {
    expect(hasBatchim('토')).toBe(false);
  });
  it('should return true for the character "읊"', () => {
    expect(hasBatchim('읊')).toBe(true);
  });
  it('should return false for the character "서"', () => {
    expect(hasBatchim('서')).toBe(false);
  });
});

describe('getFirstConsonants', () => {
  it('should extract the initial consonants "ㅅㄱ" from the word "사과"', () => {
    expect(getFirstConsonants('사과')).toBe('ㅅㄱ');
  });
  it('should extract the initial consonants "ㅍㄹㅌㅇㄷ" from the word "프론트엔드"', () => {
    expect(getFirstConsonants('프론트엔드')).toBe('ㅍㄹㅌㅇㄷ');
  });
  it('should extract the initial consonants "ㄴㅈ" from the consonants "ㄴㅈ"', () => {
    expect(getFirstConsonants('ㄴㅈ')).toBe('ㄴㅈ');
  });
  it('should extract the initial consonants "ㄹㅇㅌ" from the word "리액트"', () => {
    expect(getFirstConsonants('리액트')).toBe('ㄹㅇㅌ');
  });

  it('should extract the initial consonants "ㄸㅇ ㅆㄱ" from the phrase "띄어 쓰기"', () => {
    expect(getFirstConsonants('띄어 쓰기')).toBe('ㄸㅇ ㅆㄱ');
  });
});

describe('canBeChosung', () => {
  it('ㄱ', () => {
    expect(canBeChosung('ㄱ')).toBe(true);
  });
  it('ㅃ', () => {
    expect(canBeChosung('ㅃ')).toBe(true);
  });
  it('ㅏ', () => {
    expect(canBeChosung('ㅏ')).toBe(false);
  });
  it('ㅘ', () => {
    expect(canBeChosung('ㅏ')).toBe(false);
  });
  it('ㄱㅅ', () => {
    expect(canBeChosung('ㅏ')).toBe(false);
  });
  it('가', () => {
    expect(canBeChosung('ㅏ')).toBe(false);
  });
});

describe('canBeJungsung', () => {
  it('ㅗㅏ', () => {
    expect(canBeJungsung('ㅗㅏ')).toBe(true);
  });
  it('ㅏ', () => {
    expect(canBeJungsung('ㅏ')).toBe(true);
  });
  it('ㄱ', () => {
    expect(canBeJungsung('ㄱ')).toBe(false);
  });
  it('ㄱㅅ', () => {
    expect(canBeJungsung('ㄱㅅ')).toBe(false);
  });
  it('가', () => {
    expect(canBeJungsung('가')).toBe(false);
  });
});

describe('canBeJongsung', () => {
  it('ㄱ', () => {
    expect(canBeJongsung('ㄱ')).toBe(true);
  });
  it('ㄱㅅ', () => {
    expect(canBeJongsung('ㄱㅅ')).toBe(true);
  });
  it('ㅂㅅ', () => {
    expect(canBeJongsung('ㅂㅅ')).toBe(true);
  });
  it('ㅎㄹ', () => {
    expect(canBeJongsung('ㅎㄹ')).toBe(false);
  });
  it('ㅗㅏ', () => {
    expect(canBeJongsung('ㅗㅏ')).toBe(false);
  });
  it('ㅏ', () => {
    expect(canBeJongsung('ㅏ')).toBe(false);
  });
  it('가', () => {
    expect(canBeJongsung('ㅏ')).toBe(false);
  });
});
