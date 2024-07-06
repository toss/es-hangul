import { typeHangul, getTypewriterHangul } from './typeHangul';

describe('typeHangul', () => {
  it('"" -> "안녕하세요"', () => {
    const generator = typeHangul('안녕하세요');
    const steps = [
      'ㅇ',
      '아',
      '안',
      '안ㄴ',
      '안녀',
      '안녕',
      '안녕ㅎ',
      '안녕하',
      '안녕핫',
      '안녕하세',
      '안녕하세ㅇ',
      '안녕하세요',
    ];
    expect(removeLastHangulCharacter('안녕하세요 값')).toBe('안녕하세요 갑');
  });
});
