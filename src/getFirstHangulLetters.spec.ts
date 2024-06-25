import { getFirstHangulLetters } from './getFirstHangulLetters';

describe('getFirstHangulLetters', () => {
  it('한글 문장 단어중 첫 문자만 뽑은 리스트를 반환', () => {
    expect(getFirstHangulLetters('치킨과 맥주')).toHaveLength(2);
    expect(getFirstHangulLetters('치킨과 맥주').join('')).toBe('치맥');
  });
});
