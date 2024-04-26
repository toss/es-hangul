import { hangulIncludes } from './hangulIncludes';

describe('hangulIncludes', () => {
  describe('한글이 포함되어있다고 판단되는 경우', () => {
    it('사과', () => {
      expect(hangulIncludes('사과', '')).toBe(true);
      expect(hangulIncludes('사과', 'ㅅ')).toBe(true);
      expect(hangulIncludes('사과', '삭')).toBe(true);
      expect(hangulIncludes('사과', '사과')).toBe(true);
    });

    it('프론트엔드', () => {
      expect(hangulIncludes('프론트엔드', '')).toBe(true);
      expect(hangulIncludes('프론트엔드', '플')).toBe(true);
      expect(hangulIncludes('프론트엔드', '틍')).toBe(true);
      expect(hangulIncludes('프론트엔드', '플')).toBe(true);
      expect(hangulIncludes('프론트엔드', '프로')).toBe(true);
    });
  });

  describe('한글이 포함되어있다고 판단되지 않는 경우', () => {
    it('사과', () => {
      expect(hangulIncludes('사과', '삽')).toBe(false);
    });

    it('프론트엔드', () => {
      expect(hangulIncludes('프론트엔드', '픏')).toBe(false);
    });
  });
});
