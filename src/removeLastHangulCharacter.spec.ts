import { describe, it, expect } from 'vitest';
import { removeLastHangulCharacter } from './removeLastHangulCharacter';

describe('removeLastCharacter', () => {
  it('마지막 문자가 겹받침인 경우 홑받침으로 바꾼다', () => {
    expect(removeLastHangulCharacter('안녕하세요 값')).toBe('안녕하세요 갑');
  });
  it('마지막 문자가 초성과 중성의 조합으로 끝날 경우 초성만 남긴다', () => {
    expect(removeLastHangulCharacter('프론트엔드')).toBe('프론트엔ㄷ');
  });
  it('마지막 문자가 초성과 중성과 종성의 조합으로 끝날 경우 초성과 중성이 조합된 문자만 남긴다.', () => {
    expect(removeLastHangulCharacter('일요일')).toBe('일요이');
    expect(removeLastHangulCharacter('깎')).toBe('까');
  });
});
