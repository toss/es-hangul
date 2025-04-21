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
});
