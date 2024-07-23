import { canBeChoseong, canBeJongseong, canBeJungseong } from './canBe';

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
