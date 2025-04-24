import { canBeJongseong } from './canBeJongseong';

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
