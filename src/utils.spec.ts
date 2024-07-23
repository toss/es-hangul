import {
  canBeChoseong,
  canBeJongseong,
  canBeJungseong,
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

  describe('완성된 한글이 아닌 경우', () => {
    it('한글이 자음 또는 모음으로만 구성된 경우 false를 반환한다.', () => {
      expect(hasBatchim('ㄱ')).toBe(false);
      expect(hasBatchim('ㅏ')).toBe(false);
    });

    it('한글 외의 문자를 입력하면 false를 반환한다', () => {
      expect(hasBatchim('cat')).toBe(false);
      expect(hasBatchim('!')).toBe(false);
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

    it('한글 외의 문자를 입력하면 false를 반환한다.', () => {
      expect(hasSingleBatchim('cat')).toBe(false);
      expect(hasSingleBatchim('')).toBe(false);
      expect(hasSingleBatchim('?')).toBe(false);
    });

    it('한글 외의 문자를 입력하면 false를 반환한다.', () => {
      expect(hasSingleBatchim('cat')).toBe(false);
      expect(hasSingleBatchim('')).toBe(false);
      expect(hasSingleBatchim('?')).toBe(false);
    });
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

describe('canBeChoseong', () => {
  describe('초성이 될 수 있다고 판단되는 경우', () => {
    it('ㄱ', () => {
      expect(canBeChoseong('ㄱ')).toBe(true);
    });
    it('ㅃ', () => {
      expect(canBeChoseong('ㅃ')).toBe(true);
    });
  });

  describe('초성이 될 수 없다고 판단되는 경우', () => {
    it('ㅏ', () => {
      expect(canBeChoseong('ㅏ')).toBe(false);
    });
    it('ㅘ', () => {
      expect(canBeChoseong('ㅘ')).toBe(false);
    });
    it('ㄱㅅ', () => {
      expect(canBeChoseong('ㄱㅅ')).toBe(false);
    });
    it('가', () => {
      expect(canBeChoseong('가')).toBe(false);
    });
  });
});

describe('canBeJungseong', () => {
  describe('중성이 될 수 있다고 판단되는 경우', () => {
    it('ㅗㅏ', () => {
      expect(canBeJungseong('ㅗㅏ')).toBe(true);
    });
    it('ㅏ', () => {
      expect(canBeJungseong('ㅏ')).toBe(true);
    });
  });

  describe('중성이 될 수 없다고 판단되는 경우', () => {
    it('ㄱ', () => {
      expect(canBeJungseong('ㄱ')).toBe(false);
    });
    it('ㄱㅅ', () => {
      expect(canBeJungseong('ㄱㅅ')).toBe(false);
    });
    it('가', () => {
      expect(canBeJungseong('가')).toBe(false);
    });
  });
});

describe('canBeJongseong', () => {
  describe('종성이 될 수 있다고 판단되는 경우', () => {
    it('ㄱ', () => {
      expect(canBeJongseong('ㄱ')).toBe(true);
    });
    it('ㄱㅅ', () => {
      expect(canBeJongseong('ㄱㅅ')).toBe(true);
    });
    it('ㅂㅅ', () => {
      expect(canBeJongseong('ㅂㅅ')).toBe(true);
    });
  });

  describe('종성이 될 수 없다고 판단되는 경우', () => {
    it('ㅎㄹ', () => {
      expect(canBeJongseong('ㅎㄹ')).toBe(false);
    });
    it('ㅗㅏ', () => {
      expect(canBeJongseong('ㅗㅏ')).toBe(false);
    });
    it('ㅏ', () => {
      expect(canBeJongseong('ㅏ')).toBe(false);
    });
    it('가', () => {
      expect(canBeJongseong('ㅏ')).toBe(false);
    });
  });
});
