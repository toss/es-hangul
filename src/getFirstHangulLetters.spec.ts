import { getFirstHangulLetters } from './getFirstHangulLetters';

describe('getFirstHangulLetters', () => {
  it('한글 문장 단어중 첫 문자만 뽑은 리스트를 반환', () => {
    expect(getFirstHangulLetters('치킨과 맥주')).toHaveLength(2);
    expect(getFirstHangulLetters('치킨과 맥주').join('')).toBe('치맥');

    expect(getFirstHangulLetters('버스 충전 카드')).toHaveLength(3);
    expect(getFirstHangulLetters('버스 충전 카드').join('')).toBe('버충카');
  });
  it('한글이 아닌 문장 넣었을 때', () => {
    expect(() => getFirstHangulLetters('test test')).toThrowError(
      'Invalid Hangul text, please input Hangul text only.'
    );
  });

  it('한글과 영어가 섞인 문장을 넣었을 때', () => {
    expect(() => getFirstHangulLetters('고기와 Cheese')).toThrowError(
      'Invalid Hangul text, please input Hangul text only.'
    );
  });
});
