import { needAssemble } from "./needAssemble";

describe('needAssemble', () => {
  it('온전한 한글 문장', () => {
    expect(needAssemble('아버지가 방에 들어갑니다')).toBe(false);
  });
  it('온전하지 않지만 합성 불가능한 한글 문장', () => {
    expect(needAssemble('아버지가 방에 들어갑니다ㅏ')).toBe(false);
    expect(needAssemble('아버지가 방ㅇ에 들어갑니다')).toBe(false);
    expect(needAssemble('아버지가 ㅇ에 들어갑니다')).toBe(false);
  });
  it('모음과 자음이 나눠져있는 문장', () => {
    expect(needAssemble('아버지가 방ㅇㅔ 들어갑니다')).toBe(true);
  });
  it('자음이 나누어져있는 문장', () => {
    expect(needAssemble('아버지가 방에 들어갑니다ㅇ')).toBe(true);
    expect(needAssemble('갑ㅅ을 치루다')).toBe(true);
  });
  it('모음이 나누어져있는 문장', () => {
    expect(needAssemble('아버지가 방에 들어갑닏ㅏ')).toBe(true);
    expect(needAssemble('아버지가 고ㅏ자를 드십니다')).toBe(true);
  });
});