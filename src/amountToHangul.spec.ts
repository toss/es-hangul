import { amountToHangul } from './amountToHangul';

describe('amountToHangul', () => {
  it('숫자로 된 금액을 한글로 표기', () => {
    expect(amountToHangul('15,201,100')).toEqual('일천오백이십만천백');
    expect(amountToHangul('120,030원')).toEqual('일십이만삼십'); // 숫자 외 문자 무시
    expect(amountToHangul('392.24')).toEqual('삼백구십이'); // 소수점 무시
    expect(amountToHangul('100000000')).toEqual('일억');
    expect(amountToHangul('100000100')).toEqual('일억백');
  });

  it('숫자로 된 금액이 80글자를 넘을 시 에러 발생', () => {
    const longNumberString = '1'.repeat(81);
    assert.throws(() => amountToHangul(longNumberString), Error, `convert range exceeded : ${longNumberString}`);
  });
});
