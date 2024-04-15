import { describe, expect, expectTypeOf, it } from 'vitest';
import { getFirstConsonants, hasBatchim, hasProperty, hasValueInReadOnlyStringList } from './utils';

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

describe('hasValueInReadOnlyStringList', () => {
  const testReadonlyList = ['ㄱ', 'ㄴ', 'ㄷ'] as const;

  it('should return true if an element exists in a read-only string list', () => {
    const testValue = 'ㄱ';

    expect(hasValueInReadOnlyStringList(testReadonlyList, testValue)).toBeTruthy();
  });

  it('should return false if an element does not exist in a read-only string list', () => {
    const testValue = 'ㄹ';

    expect(hasValueInReadOnlyStringList(testReadonlyList, testValue)).toBeFalsy();
  });

  it('should narrow the type of the second argument if it is included in a read-only string list', () => {
    const testValue = 'ㄱ' as string;

    if (hasValueInReadOnlyStringList(testReadonlyList, testValue)) {
      expectTypeOf(testValue).toEqualTypeOf<'ㄱ' | 'ㄴ' | 'ㄷ'>();
    } else {
      expectTypeOf(testValue).toEqualTypeOf<string>();
    }
  });
});

describe('hasProperty', () => {
  const testObj = { ㄱ: 'ㄱ', ㄴ: 'ㄴ', ㄷ: 'ㄷ' } as const;

  it('should return true if a property exists in a object', () => {
    const testKey = 'ㄱ';

    expect(hasProperty(testObj, testKey)).toBeTruthy();
  });

  it('should return false if a property does not exist in a object', () => {
    const testKey = 'ㄹ';

    expect(hasProperty(testObj, testKey)).toBeFalsy();
  });

  it('should narrow the type of the second argument if it is included in a object', () => {
    const testKey = 'ㄱ' as string;

    if (hasProperty(testObj, testKey)) {
      expectTypeOf(testKey).toEqualTypeOf<'ㄱ' | 'ㄴ' | 'ㄷ'>();
    } else {
      expectTypeOf(testKey).toEqualTypeOf<string>();
    }
  });
});
