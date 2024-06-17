import { amountsToHangul } from './amountsToHangul';

describe('amountsToHangul', () => {
  it('숫자로 된 금액을 한글로 표기', () => {
    expect(amountsToHangul('15,201,100')).toEqual('일천오백이십만천백');
    expect(amountsToHangul('120,030원')).toEqual('일십이만삼십'); // 숫자 외 문자 무시
    expect(amountsToHangul('392.24')).toEqual('삼백구십이'); // 소수점 무시
  });
});
