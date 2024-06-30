import {
  canBeChosung,
  canBeJongsung,
  canBeJungsung,
  getChosung,
  getFirstConsonants,
  hasBatchim,
  hasProperty,
  hasSingleBatchim,
  hasValueInReadOnlyStringList,
} from './utils';

describe('hasBatchim', () => {
  describe('받침이 있다고 판단되는 경우', () => {
    it('"값" 문자에서 받침이 있으므로 true를 반환한다.', () => {
      expect(hasBatchim('값')).toBe(true);
    });
    it('"공" 문자에서 받침이 있으므로 true를 반환한다.', () => {
      expect(hasBatchim('공')).toBe(true);
    });
    it('"읊" 문자에서 받침이 있으므로 true를 반환한다.', () => {
      expect(hasBatchim('읊')).toBe(true);
    });
  });

  describe('받침이 없다고 판단되는 경우', () => {
    it('"토" 문자에서 받침이 없으므로 false를 반환한다.', () => {
      expect(hasBatchim('토')).toBe(false);
    });
    it('"서" 문자에서 받침이 없으므로 false를 반환한다.', () => {
      expect(hasBatchim('서')).toBe(false);
    });
    it('빈 문자열은 받침이 없으므로 false를 반환한다.', () => {
      expect(hasBatchim('')).toBe(false);
    });
  });
});

describe('hasSingleBatchim', () => {
  it('홑받침을 받으면 true를 반환한다.', () => {
    expect(hasSingleBatchim('공')).toBe(true);
    expect(hasSingleBatchim('핫')).toBe(true);
    expect(hasSingleBatchim('양')).toBe(true);
    expect(hasSingleBatchim('신')).toBe(true);
    expect(hasSingleBatchim('확')).toBe(true);
  });

  describe('홑받침이 아니라고 판단되는 경우', () => {
    it('겹받침을 받으면 false를 반환한다.', () => {
      expect(hasSingleBatchim('값')).toBe(false);
      expect(hasSingleBatchim('읊')).toBe(false);
      expect(hasSingleBatchim('웱')).toBe(false);
    });

    it('받침이 없는 문자를 받으면 false를 반환한다.', () => {
      expect(hasSingleBatchim('토')).toBe(false);
      expect(hasSingleBatchim('서')).toBe(false);
      expect(hasSingleBatchim('와')).toBe(false);
    });
  });
});

describe('getChosung', () => {
  it('"사과" 단어에서 초성 "ㅅㄱ"을 추출한다.', () => {
    expect(getChosung('사과')).toBe('ㅅㄱ');
  });
  it('"프론트엔드" 단어에서 초성 "ㅍㄹㅌㅇㄷ"을 추출한다.', () => {
    expect(getChosung('프론트엔드')).toBe('ㅍㄹㅌㅇㄷ');
  });
  it('"ㄴㅈ" 문자에서 초성 "ㄴㅈ"을 추출한다.', () => {
    expect(getChosung('ㄴㅈ')).toBe('ㄴㅈ');
  });
  it('"리액트" 단어에서 초성 "ㄹㅇㅌ"을 추출한다.', () => {
    expect(getChosung('리액트')).toBe('ㄹㅇㅌ');
  });

  it('"띄어 쓰기" 문장에서 초성 "ㄸㅇ ㅆㄱ"을 추출한다.', () => {
    expect(getChosung('띄어 쓰기')).toBe('ㄸㅇ ㅆㄱ');
  });
});

describe('getFirstConsonants', () => {
  it('"사과" 단어에서 초성 "ㅅㄱ"을 추출한다.', () => {
    expect(getFirstConsonants('사과')).toBe('ㅅㄱ');
  });
  it('"프론트엔드" 단어에서 초성 "ㅍㄹㅌㅇㄷ"을 추출한다.', () => {
    expect(getFirstConsonants('프론트엔드')).toBe('ㅍㄹㅌㅇㄷ');
  });
  it('"ㄴㅈ" 문자에서 초성 "ㄴㅈ"을 추출한다.', () => {
    expect(getFirstConsonants('ㄴㅈ')).toBe('ㄴㅈ');
  });
  it('"리액트" 단어에서 초성 "ㄹㅇㅌ"을 추출한다.', () => {
    expect(getFirstConsonants('리액트')).toBe('ㄹㅇㅌ');
  });

  it('"띄어 쓰기" 문장에서 초성 "ㄸㅇ ㅆㄱ"을 추출된다.', () => {
    expect(getFirstConsonants('띄어 쓰기')).toBe('ㄸㅇ ㅆㄱ');
  });
});

describe('hasValueInReadOnlyStringList', () => {
  const testReadonlyList = ['ㄱ', 'ㄴ', 'ㄷ'] as const;

  it('read-only 문자열 리스트에 요소가 존재한다면 true를 반환한다.', () => {
    const testValue = 'ㄱ';

    expect(hasValueInReadOnlyStringList(testReadonlyList, testValue)).toBeTruthy();
  });

  it('read-only 문자열 리스트에 요소가 존재하지 않으면 false를 반환한다.', () => {
    const testValue = 'ㄹ';

    expect(hasValueInReadOnlyStringList(testReadonlyList, testValue)).toBeFalsy();
  });

  it('read-only 문자열 리스트에 요소가 존재한다면 두 번째 인자의 타입을 좁힌다.', () => {
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

  it('객체에 속성이 존재하면 true를 반환한다.', () => {
    const testKey = 'ㄱ';

    expect(hasProperty(testObj, testKey)).toBeTruthy();
  });

  it('객체에 속성이 존재하지 않으면 false를 반환한다.', () => {
    const testKey = 'ㄹ';

    expect(hasProperty(testObj, testKey)).toBeFalsy();
  });

  it('객체에 속성이 존재한다면 두 번째 인자의 타입을 좁힌다.', () => {
    const testKey = 'ㄱ' as string;

    if (hasProperty(testObj, testKey)) {
      expectTypeOf(testKey).toEqualTypeOf<'ㄱ' | 'ㄴ' | 'ㄷ'>();
    } else {
      expectTypeOf(testKey).toEqualTypeOf<string>();
    }
  });
});

describe('canBeChosung', () => {
  describe('초성이 될 수 있다고 판단되는 경우', () => {
    it('ㄱ', () => {
      expect(canBeChosung('ㄱ')).toBe(true);
    });
    it('ㅃ', () => {
      expect(canBeChosung('ㅃ')).toBe(true);
    });
  });

  describe('초성이 될 수 없다고 판단되는 경우', () => {
    it('ㅏ', () => {
      expect(canBeChosung('ㅏ')).toBe(false);
    });
    it('ㅘ', () => {
      expect(canBeChosung('ㅘ')).toBe(false);
    });
    it('ㄱㅅ', () => {
      expect(canBeChosung('ㄱㅅ')).toBe(false);
    });
    it('가', () => {
      expect(canBeChosung('가')).toBe(false);
    });
  });
});

describe('canBeJungsung', () => {
  describe('중성이 될 수 있다고 판단되는 경우', () => {
    it('ㅗㅏ', () => {
      expect(canBeJungsung('ㅗㅏ')).toBe(true);
    });
    it('ㅏ', () => {
      expect(canBeJungsung('ㅏ')).toBe(true);
    });
  });

  describe('중성이 될 수 없다고 판단되는 경우', () => {
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
});

describe('canBeJongsung', () => {
  describe('종성이 될 수 있다고 판단되는 경우', () => {
    it('ㄱ', () => {
      expect(canBeJongsung('ㄱ')).toBe(true);
    });
    it('ㄱㅅ', () => {
      expect(canBeJongsung('ㄱㅅ')).toBe(true);
    });
    it('ㅂㅅ', () => {
      expect(canBeJongsung('ㅂㅅ')).toBe(true);
    });
  });

  describe('종성이 될 수 없다고 판단되는 경우', () => {
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
});
