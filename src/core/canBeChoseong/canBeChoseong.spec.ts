import { canBeChoseong } from './canBeChoseong';

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
    it.each([
      { category: '영어', character: 'A' },
      { category: '빈칸', character: ' ' },
      { category: '다른 언어', character: 'あ' },
      { category: '특수문자', character: '!' },
    ])('$category 문자', ({ character }) => {
      expect(canBeChoseong(character)).toBe(false);
    });
  });
});
