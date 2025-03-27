import { canBeJungseong } from './canBeJungseong';

describe('canBeJungseong', () => {
  describe('중성이 될 수 있다고 판단되는 경우', () => {
    it('ㅗㅏ', () => {
      expect(canBeJungseong('ㅗㅏ')).toBe(true);
    });
    it('ㅘ', () => {
      expect(canBeJungseong('ㅘ')).toBe(true);
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
