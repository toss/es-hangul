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

  describe('한글이 아닌 문자 처리', () => {
    it('영어는 분해하지 않고 그대로 유지한다.', () => {
      expect(disassemble('abc')).toEqual('abc');
      expect(disassemble('값abc')).toEqual('ㄱㅏㅂㅅabc');
    });

    it('특수문자는 그대로 유지한다.', () => {
      expect(disassemble('값!@#')).toEqual('ㄱㅏㅂㅅ!@#');
    });

    it('한글이 아닌 다른 언어는 그대로 유지한다.', () => {
      expect(disassemble('りんご')).toEqual('りんご');
      expect(disassemble('中國')).toEqual('中國');
    });

    it('숫자는 그대로 유지한다.', () => {
      expect(disassemble('값123')).toEqual('ㄱㅏㅂㅅ123');
    });

    it('빈 문자열은 빈 문자열을 반환한다.', () => {
      expect(disassemble('')).toEqual('');
    });
  });
});
