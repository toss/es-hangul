import { hasBatchim } from './hasBatchim';

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

describe('홑받침', () => {
  it('홑받침을 받으면 true를 반환한다.', () => {
    expect(
      hasBatchim('공', {
        single: true,
      })
    ).toBe(true);

    expect(
      hasBatchim('핫', {
        single: true,
      })
    ).toBe(true);

    expect(
      hasBatchim('양', {
        single: true,
      })
    ).toBe(true);

    expect(
      hasBatchim('신', {
        single: true,
      })
    ).toBe(true);

    expect(
      hasBatchim('확', {
        single: true,
      })
    ).toBe(true);
  });

  describe('홑받침이 아니라고 판단되는 경우', () => {
    it('겹받침을 받으면 false를 반환한다.', () => {
      expect(
        hasBatchim('갑', {
          single: true,
        })
      ).toBe(false);

      expect(hasBatchim('읊', { single: true })).toBe(false);

      expect(hasBatchim('웱', { single: true })).toBe(false);
    });

    it('받침이 없는 문자를 받으면 false를 반환한다.', () => {
      expect(hasBatchim('토', { single: true })).toBe(false);
      expect(hasBatchim('서', { single: true })).toBe(false);
      expect(hasBatchim('와', { single: true })).toBe(false);
    });

    it('한글 외의 문자를 입력하면 false를 반환한다.', () => {
      expect(hasBatchim('cat', { single: true })).toBe(false);
      expect(hasBatchim('', { single: true })).toBe(false);
      expect(hasBatchim('?', { single: true })).toBe(false);
    });
  });
});
