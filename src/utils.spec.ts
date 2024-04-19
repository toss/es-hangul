import { describe, expect, expectTypeOf, it } from 'vitest';
import {
  canBeChosung,
  canBeJongsung,
  canBeJungsung,
  getFirstConsonants,
  hasBatchim,
  hasProperty,
  hasSingleBatchim,
  hasValueInReadOnlyStringList,
} from './utils';

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

describe('hasSingleBatchim', () => {
  it('홑받침을 받으면 true를 반환한다.', () => {
    expect(hasSingleBatchim('공')).toBe(true);
    expect(hasSingleBatchim('핫')).toBe(true);
    expect(hasSingleBatchim('양')).toBe(true);
    expect(hasSingleBatchim('신')).toBe(true);
  });
  it('겹받침을 받으면 false를 반환한다.', () => {
    expect(hasSingleBatchim('값')).toBe(false);
    expect(hasSingleBatchim('읊')).toBe(false);
  });

  it('받침이 없는 문자를 받으면 false를 반환한다.', () => {
    expect(hasSingleBatchim('토')).toBe(false);
    expect(hasSingleBatchim('서')).toBe(false);
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
