import { getJungseong } from './getJungseong';

describe('getJungseong', () => {
  it('"사과" 단어에서 중성 "ㅏㅘ"을 추출한다.', () => {
    expect(getJungseong('사과')).toBe('ㅏㅘ');
  });
  it('"하늘" 단어에서 중성 "ㅏㅡ"을 추출한다.', () => {
    expect(getJungseong('하늘')).toBe('ㅏㅡ');
  });
  it('"리액트" 단어에서 중성 "ㅣㅐㅡ"을 추출한다.', () => {
    expect(getJungseong('리액트')).toBe('ㅣㅐㅡ');
  });

  it('"띄어 쓰기" 문장에서 중성만 남긴다.', () => {
    expect(getJungseong('띄어 쓰기')).toBe('ㅢㅓ ㅡㅣ');
  });
});


