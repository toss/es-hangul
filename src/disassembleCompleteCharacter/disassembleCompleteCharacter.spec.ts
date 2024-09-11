import { disassembleCompleteCharacter } from './disassembleCompleteCharacter';

describe('disassembleCompleteCharacter', () => {
  it('값', () => {
    expect(disassembleCompleteCharacter('값')).toEqual({
      choseong: 'ㄱ',
      jungseong: 'ㅏ',
      jongseong: 'ㅂㅅ',
    });
  });

  it('리', () => {
    expect(disassembleCompleteCharacter('리')).toEqual({
      choseong: 'ㄹ',
      jungseong: 'ㅣ',
      jongseong: '',
    });
  });

  it('빚', () => {
    expect(disassembleCompleteCharacter('빚')).toEqual({
      choseong: 'ㅂ',
      jungseong: 'ㅣ',
      jongseong: 'ㅈ',
    });
  });

  it('박', () => {
    expect(disassembleCompleteCharacter('박')).toEqual({
      choseong: 'ㅂ',
      jungseong: 'ㅏ',
      jongseong: 'ㄱ',
    });
  });

  it('완전한 한글 문자열이 아니면 undefined를 반환해야 합니다.', () => {
    expect(disassembleCompleteCharacter('ㄱ')).toBeUndefined();
    expect(disassembleCompleteCharacter('ㅏ')).toBeUndefined();
  });
});
