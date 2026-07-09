import { assemble } from './assemble';

describe('assemble', () => {
  it('온전한 한글과 한글 문자 조합', () => {
    expect(assemble(['아버지가', ' ', '방ㅇ', 'ㅔ ', '들ㅇ', 'ㅓ갑니다'])).toEqual('아버지가 방에 들어갑니다');
  });
  it('온전한 한글만 조합', () => {
    expect(assemble(['아버지가', ' ', '방에 ', '들어갑니다'])).toEqual('아버지가 방에 들어갑니다');
  });
  it('온전하지 않은 한글만 조합', () => {
    expect(assemble(['ㅇ', 'ㅏ', 'ㅂ', 'ㅓ', 'ㅈ', 'ㅣ'])).toEqual('아버지');
  });

  it('숫자나 기호 등 한글이 아닌 문자는 조합하지 않고 그대로 유지한다', () => {
    expect(assemble(['1', '2', '3'])).toEqual('123');
    expect(assemble(['아', 'ㅇ', 'ㅣ', '123'])).toEqual('아이123');
    expect(assemble(['ㄱ', 'ㅏ', '!', 'ㄴ', 'ㅏ'])).toEqual('가!나');
    expect(assemble(['ㅇ', 'ㅑ', '1', 'ㅎ', 'ㅏ'])).toEqual('야1하');
  });
});
