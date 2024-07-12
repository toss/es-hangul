import { removeLastHangulCharacter } from './removeLastHangulCharacter';

describe('removeLastHangulCharacter', () => {
  it('마지막 문자가 겹받침인 경우 홑받침으로 바꾼다.', () => {
    expect(removeLastHangulCharacter('안녕하세요 값')).toBe('안녕하세요 갑');
    expect(removeLastHangulCharacter('안녕하세요 값이')).toBe('안녕하세요 값ㅇ');
  });
  it('마지막 문자가 초성과 중성의 조합으로 끝날 경우 초성만 남긴다.', () => {
    expect(removeLastHangulCharacter('프론트엔드')).toBe('프론트엔ㄷ');
    expect(removeLastHangulCharacter('끓다')).toBe('끓ㄷ');
    expect(removeLastHangulCharacter('관사')).toBe('관ㅅ');
    expect(removeLastHangulCharacter('괴사')).toBe('괴ㅅ');
  });
  it('마지막 문자가 초성과 중성과 종성의 조합으로 끝날 경우 초성과 중성이 조합된 문자만 남긴다.', () => {
    expect(removeLastHangulCharacter('일요일')).toBe('일요이');
    expect(removeLastHangulCharacter('완전')).toBe('완저');
    expect(removeLastHangulCharacter('왅전')).toBe('왅저');
    expect(removeLastHangulCharacter('깎')).toBe('까');
  });
  it('마지막 문자가 초성과 중성의 조합으로 끝나며, 중성 입력 시 국제 표준 한글 레이아웃 기준 단일키로 처리되지 않는 이중모음 (ㅗ/ㅜ/ㅡ 계 이중모음) 인 경우 초성과 중성의 시작 모음만 남긴다.', () => {
    expect(removeLastHangulCharacter('전화')).toBe('전호');
    expect(removeLastHangulCharacter('예의')).toBe('예으');
    expect(removeLastHangulCharacter('신세계')).toBe('신세ㄱ'); // 'ㅖ'의 경우 단일키 처리가 가능한 이중모음이므로 모음이 남지 않는다.
  });
  it('마지막 문자가 초성과 중성과 종성의 조합으로 끝나며, 중성 입력 시 국제 표준 한글 레이아웃 기준 단일키로 처리되지 않는 이중모음 (ㅗ/ㅜ/ㅡ 계 이중모음) 인 경우 초성과 중성만 남긴다.', () => {
    expect(removeLastHangulCharacter('수확')).toBe('수화');
  });
  it('마지막 문자가 초성과 중성과 종성의 조합으로 끝나며, 종성이 겹자음인 경우 초성과 중성과 종성의 시작 자음만 남긴다.', () => {
    expect(removeLastHangulCharacter('끓')).toBe('끌');
  });
  it('마지막 문자가 초성과 중성과 종성의 조합으로 끝나며, 중성 입력 시 국제 표준 한글 레이아웃 기준 단일키로 처리되지 않는 이중모음 (ㅗ/ㅜ/ㅡ 계 이중모음)이고 종성이 겹자음인 경우 초성과 중성과 종성의 시작 자음만 남긴다.', () => {
    expect(removeLastHangulCharacter('왅')).toBe('완');
  });
  it('빈 문자열일 경우 빈 문자열을 반환한다.', () => {
    expect(removeLastHangulCharacter('')).toBe('');
  });
});
