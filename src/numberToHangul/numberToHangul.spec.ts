import { numberToHangul } from './numberToHangul';

describe('numberToHangul', () => {
  test('기본 변환', () => {
    expect(numberToHangul(21_0000)).toBe('이십일만');
    expect(numberToHangul(1_2345)).toBe('일만이천삼백사십오');
    expect(numberToHangul(1_2345_6780)).toBe('일억이천삼백사십오만육천칠백팔십');
  });

  test('공백 포함 변환', () => {
    expect(numberToHangul(21_0000, true)).toBe('이십일만');
    expect(numberToHangul(1_2345, true)).toBe('일만 이천삼백사십오');
    expect(numberToHangul(1_2345_6780, true)).toBe('일억 이천삼백사십오만 육천칠백팔십');
  });

  test('0과 10,000보다 작은 경우', () => {
    expect(numberToHangul(0)).toBe('영');
    expect(numberToHangul(1)).toBe('일');
    expect(numberToHangul(2)).toBe('이');
    expect(numberToHangul(3)).toBe('삼');
    expect(numberToHangul(4)).toBe('사');
    expect(numberToHangul(5)).toBe('오');
    expect(numberToHangul(6)).toBe('육');
    expect(numberToHangul(7)).toBe('칠');
    expect(numberToHangul(8)).toBe('팔');
    expect(numberToHangul(9)).toBe('구');
    expect(numberToHangul(10)).toBe('십');
    expect(numberToHangul(11)).toBe('십일');
    expect(numberToHangul(20)).toBe('이십');
    expect(numberToHangul(30)).toBe('삼십');
    expect(numberToHangul(100)).toBe('백');
    expect(numberToHangul(101)).toBe('백일');
    expect(numberToHangul(110)).toBe('백십');
    expect(numberToHangul(200)).toBe('이백');
    expect(numberToHangul(300)).toBe('삼백');
    expect(numberToHangul(1_000)).toBe('천');
    expect(numberToHangul(1_001)).toBe('천일');
    expect(numberToHangul(1_100)).toBe('천백');
    expect(numberToHangul(1_200)).toBe('천이백');
    expect(numberToHangul(1_234)).toBe('천이백삼십사');
    expect(numberToHangul(9_999)).toBe('구천구백구십구');
  });
});
