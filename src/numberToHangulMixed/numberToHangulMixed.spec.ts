import { numberToHangulMixed } from './numberToHangulMixed';

describe('numberToHangulMixed', () => {
  test('기본 변환', () => {
    expect(numberToHangulMixed(21_0000)).toBe('21만');
    expect(numberToHangulMixed(1_2345)).toBe('1만2,345');
    expect(numberToHangulMixed(1_2345_6780)).toBe('1억2,345만6,780');
  });

  test('공백 포함 변환', () => {
    expect(numberToHangulMixed(21_0000, true)).toBe('21만');
    expect(numberToHangulMixed(1_2345, true)).toBe('1만 2,345');
    expect(numberToHangulMixed(1_2345_6780, true)).toBe('1억 2,345만 6,780');
  });

  test('0과 10,000보다 작은 경우', () => {
    expect(numberToHangulMixed(0)).toBe('0');
    expect(numberToHangulMixed(1)).toBe('1');
    expect(numberToHangulMixed(2)).toBe('2');
    expect(numberToHangulMixed(3)).toBe('3');
    expect(numberToHangulMixed(4)).toBe('4');
    expect(numberToHangulMixed(5)).toBe('5');
    expect(numberToHangulMixed(6)).toBe('6');
    expect(numberToHangulMixed(7)).toBe('7');
    expect(numberToHangulMixed(8)).toBe('8');
    expect(numberToHangulMixed(9)).toBe('9');
    expect(numberToHangulMixed(10)).toBe('10');
    expect(numberToHangulMixed(11)).toBe('11');
    expect(numberToHangulMixed(20)).toBe('20');
    expect(numberToHangulMixed(30)).toBe('30');
    expect(numberToHangulMixed(100)).toBe('100');
    expect(numberToHangulMixed(101)).toBe('101');
    expect(numberToHangulMixed(110)).toBe('110');
    expect(numberToHangulMixed(200)).toBe('200');
    expect(numberToHangulMixed(300)).toBe('300');
    expect(numberToHangulMixed(1_000)).toBe('1,000');
    expect(numberToHangulMixed(1_001)).toBe('1,001');
    expect(numberToHangulMixed(1_100)).toBe('1,100');
    expect(numberToHangulMixed(1_200)).toBe('1,200');
    expect(numberToHangulMixed(1_234)).toBe('1,234');
    expect(numberToHangulMixed(9_999)).toBe('9,999');
  });
});
