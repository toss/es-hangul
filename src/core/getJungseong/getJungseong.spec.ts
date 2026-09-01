import { getJungseong } from './getJungseong';

describe('getJungseong', () => {
  it('"사과" 단어에서 중성 "ㅏㅘ"을 추출한다.', () => {
    expect(getJungseong('사과')).toBe('ㅏㅘ');
  });
  it('"프론트엔드" 단어에서 중성 "ㅡㅗㅡㅔㅡ"을 추출한다.', () => {
    expect(getJungseong('프론트엔드')).toBe('ㅡㅗㅡㅔㅡ');
  });
  it('"ㅗㅏ" 문자에서 중성 "ㅗㅏ"을 추출한다.', () => {
    expect(getJungseong('ㅗㅏ')).toBe('ㅗㅏ');
  });
  it('"리액트" 단어에서 중성 "ㅣㅐㅡ"을 추출한다.', () => {
    expect(getJungseong('리액트')).toBe('ㅣㅐㅡ');
  });

  it('"띄어 쓰기" 문장에서 중성 "ㅢㅓ ㅡㅣ"을 추출한다.', () => {
    expect(getJungseong('띄어 쓰기')).toBe('ㅢㅓ ㅡㅣ');
  });

  describe('한글이 아닌 문자 처리', () => {
    it('영어는 제거한다.', () => {
      expect(getJungseong('apple')).toBe('');
      expect(getJungseong('사과apple')).toBe('ㅏㅘ');
    });

    it('특수문자는 제거한다.', () => {
      expect(getJungseong('사과!@#')).toBe('ㅏㅘ');
    });

    it('한글이 아닌 다른 언어는 제거한다.', () => {
      expect(getJungseong('りんご')).toBe('');
    });

    it('공백은 유지한다.', () => {
      expect(getJungseong('사과 배')).toBe('ㅏㅘ ㅐ');
    });

    it('빈 문자열은 빈 문자열을 반환한다.', () => {
      expect(getJungseong('')).toBe('');
    });
  });
});


