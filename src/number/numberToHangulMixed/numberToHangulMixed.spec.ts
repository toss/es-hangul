import { numberToHangulMixed } from './numberToHangulMixed';

describe('numberToHangulMixed', () => {
  test('기본 변환', () => {
    expect(numberToHangulMixed(210_000)).toBe('21만');
    expect(numberToHangulMixed(12_345)).toBe('1만2,345');
    expect(numberToHangulMixed(123_456_780)).toBe('1억2,345만6,780');
  });

  test('공백 포함 변환', () => {
    expect(numberToHangulMixed(210_000, { spacing: true })).toBe('21만');
    expect(numberToHangulMixed(12_345, { spacing: true })).toBe('1만 2,345');
    expect(numberToHangulMixed(123_456_780, { spacing: true })).toBe('1억 2,345만 6,780');
  });

  test('0 이상 10,000 미만인 경우', () => {
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

  test('음수', () => {
    expect(numberToHangulMixed(-210_000)).toBe('-21만');
    expect(numberToHangulMixed(-12_345)).toBe('-1만2,345');
    expect(numberToHangulMixed(-123_456_780)).toBe('-1억2,345만6,780');
    expect(numberToHangulMixed(-210_000, { spacing: true })).toBe('-21만');
    expect(numberToHangulMixed(-12_345, { spacing: true })).toBe('-1만 2,345');
    expect(numberToHangulMixed(-123_456_780, { spacing: true })).toBe('-1억 2,345만 6,780');
  });

  test('Infinity', () => {
    expect(numberToHangulMixed(Infinity)).toBe('무한대');
    expect(numberToHangulMixed(-Infinity)).toBe('-무한대');
    expect(numberToHangulMixed(-Infinity, { spacing: true })).toBe('-무한대');
  });

  test('소수', () => {
    expect(numberToHangulMixed(0.1)).toBe('0.1');
    expect(numberToHangulMixed(12_345.678)).toBe('1만2,345.678');
    expect(numberToHangulMixed(-0.1)).toBe('-0.1');
    expect(numberToHangulMixed(-12_345.678)).toBe('-1만2,345.678');
    expect(numberToHangulMixed(0.1, { spacing: true })).toBe('0.1');
    expect(numberToHangulMixed(12_345.678, { spacing: true })).toBe('1만 2,345.678');
    expect(numberToHangulMixed(-0.1, { spacing: true })).toBe('-0.1');
    expect(numberToHangulMixed(-12_345.678, { spacing: true })).toBe('-1만 2,345.678');
  });

  test('유효하지 않은 입력에 대한 오류 처리', () => {
    expect(() => numberToHangulMixed(NaN)).toThrow('유효한 숫자를 입력해주세요.');
    expect(() => numberToHangulMixed('123' as unknown as number)).toThrow('유효한 숫자를 입력해주세요.');
  });

  test('변환 범위를 벗어난 입력에 대한 오류 처리', () => {
    // 1e21 이상의 수는 toString()이 과학적 표기법("1e+21")을 반환해 겉보기에 그럴듯한
    // 잘못된 문자열("1만" 등)이 조용히 노출되었다
    expect(() => numberToHangulMixed(1e21)).toThrow('변환할 수 있는 범위를 벗어난 숫자입니다.');
    expect(() => numberToHangulMixed(1e30)).toThrow('변환할 수 있는 범위를 벗어난 숫자입니다.');
    expect(() => numberToHangulMixed(-1e21)).toThrow('변환할 수 있는 범위를 벗어난 숫자입니다.');
    expect(() => numberToHangulMixed(3.14e25)).toThrow('변환할 수 있는 범위를 벗어난 숫자입니다.');
    expect(() => numberToHangulMixed(Number.MAX_VALUE)).toThrow('변환할 수 있는 범위를 벗어난 숫자입니다.');
    // 1e-6 미만의 소수도 동일한 이유로 과학적 표기법이 된다
    expect(() => numberToHangulMixed(1e-7)).toThrow('변환할 수 있는 범위를 벗어난 숫자입니다.');
  });

  test('변환 범위 경계값은 정상 동작한다', () => {
    expect(numberToHangulMixed(1e20)).toBe('1해');
    expect(numberToHangulMixed(1e-6)).toBe('0.000001');
  });
});
