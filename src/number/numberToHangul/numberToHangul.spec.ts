import { numberToHangul } from './numberToHangul';

describe('numberToHangul', () => {
  test('기본 변환', () => {
    expect(numberToHangul(210_000)).toBe('이십일만');
    expect(numberToHangul(12_345)).toBe('일만이천삼백사십오');
    expect(numberToHangul(123_456_780)).toBe('일억이천삼백사십오만육천칠백팔십');
    expect(numberToHangul(100_000_000)).toBe('일억');
    expect(numberToHangul(1_000_000_000_000)).toBe('일조');
  });

  test('공백 포함 변환', () => {
    expect(numberToHangul(210_000, { spacing: true })).toBe('이십일만');
    expect(numberToHangul(12_345, { spacing: true })).toBe('일만 이천삼백사십오');
    expect(numberToHangul(123_456_780, { spacing: true })).toBe('일억 이천삼백사십오만 육천칠백팔십');
  });

  test('0 이상 10,000 미만인 경우', () => {
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

  test('음수', () => {
    expect(numberToHangul(-210_000)).toBe('마이너스이십일만');
    expect(numberToHangul(-12_345)).toBe('마이너스일만이천삼백사십오');
    expect(numberToHangul(-123_456_780)).toBe('마이너스일억이천삼백사십오만육천칠백팔십');
    expect(numberToHangul(-210_000, { spacing: true })).toBe('마이너스 이십일만');
    expect(numberToHangul(-12_345, { spacing: true })).toBe('마이너스 일만 이천삼백사십오');
    expect(numberToHangul(-123_456_780, { spacing: true })).toBe('마이너스 일억 이천삼백사십오만 육천칠백팔십');
  });

  test('Infinity', () => {
    expect(numberToHangul(Infinity)).toBe('무한대');
    expect(numberToHangul(-Infinity)).toBe('마이너스무한대');
    expect(numberToHangul(-Infinity, { spacing: true })).toBe('마이너스 무한대');
  });

  test('소수', () => {
    expect(numberToHangul(0.1)).toBe('영점일');
    expect(numberToHangul(12_345.678)).toBe('일만이천삼백사십오점육칠팔');
    expect(numberToHangul(-0.1)).toBe('마이너스영점일');
    expect(numberToHangul(-12_345.678)).toBe('마이너스일만이천삼백사십오점육칠팔');
    expect(numberToHangul(0.0102)).toEqual('영점영일영이');
    expect(numberToHangul(0.1, { spacing: true })).toBe('영점 일');
    expect(numberToHangul(12_345.678, { spacing: true })).toBe('일만 이천삼백사십오점 육칠팔');
    expect(numberToHangul(-0.1, { spacing: true })).toBe('마이너스 영점 일');
    expect(numberToHangul(-12_345.678, { spacing: true })).toBe('마이너스 일만 이천삼백사십오점 육칠팔');
  });

  test('유효하지 않은 입력에 대한 오류 처리', () => {
    expect(() => numberToHangul(NaN)).toThrow('유효한 숫자를 입력해주세요.');
    expect(() => numberToHangul('123' as unknown as number)).toThrow('유효한 숫자를 입력해주세요.');
  });

  test('변환 범위를 벗어난 입력에 대한 오류 처리', () => {
    // 1e21 이상의 수는 toString()이 과학적 표기법("1e+21")을 반환해 잘못된 결과가 조용히 노출되었다
    expect(() => numberToHangul(1e21)).toThrow('변환할 수 있는 범위를 벗어난 숫자입니다.');
    expect(() => numberToHangul(1e30)).toThrow('변환할 수 있는 범위를 벗어난 숫자입니다.');
    expect(() => numberToHangul(-1e21)).toThrow('변환할 수 있는 범위를 벗어난 숫자입니다.');
    expect(() => numberToHangul(Number.MAX_VALUE)).toThrow('변환할 수 있는 범위를 벗어난 숫자입니다.');
    // 1e-6 미만의 소수도 동일한 이유로 과학적 표기법이 된다
    expect(() => numberToHangul(1e-7)).toThrow('변환할 수 있는 범위를 벗어난 숫자입니다.');
    expect(() => numberToHangul(-1e-7)).toThrow('변환할 수 있는 범위를 벗어난 숫자입니다.');
  });

  test('변환 범위 경계값은 정상 동작한다', () => {
    expect(numberToHangul(1e20)).toBe('일해');
    expect(numberToHangul(999_999_999_999_999_900_000)).toBe('구해구천구백구십구경구천구백구십구조구천구백구십구억구천구백구십만');
    expect(numberToHangul(1e-6)).toBe('영점영영영영영일');
  });
});
