import { amountToMoneyCurrency } from './amountToMoneyCurrency';

describe('amountToMoneyCurrency', () => {
  it('금액 문자열을 한글로 표기', () => {
    expect(amountToMoneyCurrency('15,201,100')).toEqual('일천오백이십만천백');
    expect(amountToMoneyCurrency('100000000')).toEqual('일억');
    expect(amountToMoneyCurrency('100000100')).toEqual('일억백');
    expect(amountToMoneyCurrency('0')).toEqual('영');
    expect(amountToMoneyCurrency('')).toEqual('');
  });

  it('숫자로 된 금액이 80글자를 넘을 시 에러 발생', () => {
    const longNumberString = '1'.repeat(81);
    expect(() => amountToMoneyCurrency(longNumberString)).toThrowError(`convert range exceeded : ${longNumberString}`);
  });

  it('숫자 외 문자를 무시하여 반환', () => {
    expect(amountToMoneyCurrency('120,030원')).toEqual('일십이만삼십');
  });

  it('소수점이 있는 경우도 표기', () => {
    expect(amountToMoneyCurrency('0.01020')).toEqual('영점영일영이');
    expect(amountToMoneyCurrency('0.0000')).toEqual('영');
    expect(amountToMoneyCurrency('.0000')).toEqual('영');
    expect(amountToMoneyCurrency('392.24')).toEqual('삼백구십이점이사');
    expect(amountToMoneyCurrency('12345.6789')).toEqual('일만이천삼백사십오점육칠팔구');
  });

  it('금액 숫자를 한글로 표기', () => {
    expect(amountToMoneyCurrency(15_201_100)).toEqual('일천오백이십만천백');
    expect(amountToMoneyCurrency(100000100)).toEqual('일억백');
    expect(amountToMoneyCurrency(392.24)).toEqual('삼백구십이점이사');
  });

  it('선행 0이 있는 경우 처리', () => {
    expect(amountToMoneyCurrency('01023')).toEqual('일천이십삼');
    expect(amountToMoneyCurrency('001023')).toEqual('일천이십삼');
    expect(amountToMoneyCurrency('0001023')).toEqual('일천이십삼');
  });
});
