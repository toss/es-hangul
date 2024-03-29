import { hangulIncludes } from './hangulIncludes';
import { describe, it, expect } from 'vitest';

describe('hangulIncludes', () => {
  it('사과', () => {
    expect(hangulIncludes('사과', '')).toBe(true);
    expect(hangulIncludes('사과', 'ㅅ')).toBe(true);
    expect(hangulIncludes('사과', '삭')).toBe(true);
    expect(hangulIncludes('사과', '삽')).toBe(false);
    expect(hangulIncludes('사과', '사과')).toBe(true);
  });

  it('프론트엔드', () => {
    expect(hangulIncludes('프론트엔드', '')).toBe(true);
    expect(hangulIncludes('프론트엔드', '플')).toBe(true);
    expect(hangulIncludes('프론트엔드', '틍')).toBe(true);
    expect(hangulIncludes('프론트엔드', '픏')).toBe(false);
    expect(hangulIncludes('프론트엔드', '플')).toBe(true);
    expect(hangulIncludes('프론트엔드', '프로')).toBe(true);
  });
});
