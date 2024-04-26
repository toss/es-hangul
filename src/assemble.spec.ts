import { assembleHangul } from './assemble';

describe('assembleHangul', () => {
  it('온전한 한글과 한글 문자 조합', () => {
    expect(assembleHangul(['아버지가', ' ', '방ㅇ', 'ㅔ ', '들ㅇ', 'ㅓ갑니다'])).toEqual('아버지가 방에 들어갑니다');
  });
  it('온전한 한글만 조합', () => {
    expect(assembleHangul(['아버지가', ' ', '방에 ', '들어갑니다'])).toEqual('아버지가 방에 들어갑니다');
  });
  it('온전하지 않은 한글만 조합', () => {
    expect(assembleHangul(['ㅇ', 'ㅏ', 'ㅂ', 'ㅓ', 'ㅈ', 'ㅣ'])).toEqual('아버지');
  });
});
