import { disassembleToGroups } from './disassembleToGroups';

describe('disassembleToGroups', () => {
  it('값', () => {
    expect(disassembleToGroups('값')).toEqual([['ㄱ', 'ㅏ', 'ㅂ', 'ㅅ']]);
  });

  it('값이 비싸다', () => {
    expect(disassembleToGroups('값이 비싸다')).toEqual([
      ['ㄱ', 'ㅏ', 'ㅂ', 'ㅅ'],
      ['ㅇ', 'ㅣ'],
      [' '],
      ['ㅂ', 'ㅣ'],
      ['ㅆ', 'ㅏ'],
      ['ㄷ', 'ㅏ'],
    ]);
  });

  it('사과 짱', () => {
    expect(disassembleToGroups('사과 짱')).toEqual([['ㅅ', 'ㅏ'], ['ㄱ', 'ㅗ', 'ㅏ'], [' '], ['ㅉ', 'ㅏ', 'ㅇ']]);
  });

  it('ㄵ', () => {
    expect(disassembleToGroups('ㄵ')).toEqual([['ㄴ', 'ㅈ']]);
  });

  it('ㅘ', () => {
    expect(disassembleToGroups('ㅘ')).toEqual([['ㅗ', 'ㅏ']]);
  });

  describe('한글이 아닌 문자 처리', () => {
    it('영어는 분해하지 않고 한 글자씩 그룹으로 유지한다.', () => {
      expect(disassembleToGroups('값abc')).toEqual([['ㄱ', 'ㅏ', 'ㅂ', 'ㅅ'], ['a'], ['b'], ['c']]);
    });

    it('특수문자와 한글이 아닌 다른 언어는 그대로 유지한다.', () => {
      expect(disassembleToGroups('a!')).toEqual([['a'], ['!']]);
      expect(disassembleToGroups('あ')).toEqual([['あ']]);
    });

    it('빈 문자열은 빈 배열을 반환한다.', () => {
      expect(disassembleToGroups('')).toEqual([]);
    });
  });
});
