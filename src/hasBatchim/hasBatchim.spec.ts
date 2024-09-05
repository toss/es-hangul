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
        only: 'single',
      })
    ).toBe(true);

    expect(
      hasBatchim('핫', {
        only: 'single',
      })
    ).toBe(true);

    expect(
      hasBatchim('양', {
        only: 'single',
      })
    ).toBe(true);

    expect(
      hasBatchim('신', {
        only: 'single',
      })
    ).toBe(true);

    expect(
      hasBatchim('확', {
        only: 'single',
      })
    ).toBe(true);
  });

  describe('홑받침이 아니라고 판단되는 경우', () => {
    it('겹받침을 받으면 false를 반환한다.', () => {
      expect(
        hasBatchim('값', {
          only: 'single',
        })
      ).toBe(false);

      expect(
        hasBatchim('읊', {
          only: 'single',
        })
      ).toBe(false);

      expect(hasBatchim('웱', { only: 'single' })).toBe(false);
    });

    it('받침이 없는 문자를 받으면 false를 반환한다.', () => {
      expect(hasBatchim('토', { only: 'single' })).toBe(false);
      expect(hasBatchim('서', { only: 'single' })).toBe(false);
      expect(hasBatchim('와', { only: 'single' })).toBe(false);
    });

    it('한글 외의 문자를 입력하면 false를 반환한다.', () => {
      expect(hasBatchim('cat', { only: 'single' })).toBe(false);
      expect(hasBatchim('', { only: 'single' })).toBe(false);
      expect(hasBatchim('?', { only: 'single' })).toBe(false);
    });
  });

  describe('겹받침', () => {
    it('겹받침을 받으면 true를 반환한다.', () => {
      expect(
        hasBatchim('값', {
          only: 'double',
        })
      ).toBe(true);

      expect(
        hasBatchim('읊', {
          only: 'double',
        })
      ).toBe(true);

      expect(
        hasBatchim('웱', {
          only: 'double',
        })
      ).toBe(true);
    });

    describe('겹받침이 아니라고 판단되는 경우', () => {
      it('홑받침을 받으면 false를 반환한다.', () => {
        expect(
          hasBatchim('공', {
            only: 'double',
          })
        ).toBe(false);

        expect(
          hasBatchim('핫', {
            only: 'double',
          })
        ).toBe(false);

        expect(
          hasBatchim('양', {
            only: 'double',
          })
        ).toBe(false);

        expect(
          hasBatchim('신', {
            only: 'double',
          })
        ).toBe(false);

        expect(
          hasBatchim('확', {
            only: 'double',
          })
        ).toBe(false);
      });

      it('받침이 없는 문자를 받으면 false를 반환한다.', () => {
        expect(hasBatchim('토', { only: 'double' })).toBe(false);
        expect(hasBatchim('서', { only: 'double' })).toBe(false);
        expect(hasBatchim('와', { only: 'double' })).toBe(false);
      });

      it('한글 외의 문자를 입력하면 false를 반환한다.', () => {
        expect(hasBatchim('cat', { only: 'double' })).toBe(false);
        expect(hasBatchim('', { only: 'double' })).toBe(false);
        expect(hasBatchim('?', { only: 'double' })).toBe(false);
      });
    });
  });
});
