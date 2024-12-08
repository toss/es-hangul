import { disassemble } from './disassemble';

describe('disassemble', () => {
  it('값', () => {
    expect(disassemble('값')).toEqual('ㄱㅏㅂㅅ');
  });

  it('값이 비싸다', () => {
    expect(disassemble('값이 비싸다')).toEqual('ㄱㅏㅂㅅㅇㅣ ㅂㅣㅆㅏㄷㅏ');
  });

  it('사과 짱', () => {
    expect(disassemble('사과 짱')).toEqual('ㅅㅏㄱㅗㅏ ㅉㅏㅇ');
  });

  it('ㄵ', () => {
    expect(disassemble('ㄵ')).toEqual('ㄴㅈ');
  });

  it('ㅘ', () => {
    expect(disassemble('ㅘ')).toEqual('ㅗㅏ');
  });
});
