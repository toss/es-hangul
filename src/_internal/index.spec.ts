import assert, { excludeLastElement, isBlank, joinString } from './index';

describe('excludeLastElement', () => {
  it('마지막 요소를 제외한 모든 요소와 마지막 요소를 반환한다', () => {
    const result = excludeLastElement(['apple', 'banana', 'cherry']);

    expect(result).toEqual([['apple', 'banana'], 'cherry']);
  });

  it('입력 배열이 비어 있으면 빈 배열과 빈 문자열을 반환한다', () => {
    const result = excludeLastElement([]);

    expect(result).toEqual([[], '']);
  });

  it('배열에 단 하나의 요소만 있는 경우, 빈배열과 그 요소를 반환한다', () => {
    const result = excludeLastElement(['apple']);

    expect(result).toEqual([[], 'apple']);
  });
});

describe('joinString', () => {
  it('여러 문자열을 하나의 문자열로 연결한다', () => {
    const result = joinString('Hello', ' ', 'World');

    expect(result).toBe('Hello World');
  });

  it('인자가 주어지지 않았을 때 빈 문자열을 반환한다', () => {
    const result = joinString();

    expect(result).toBe('');
  });
});

describe('isBlank', () => {
  it('문자가 공백이면 true를 반환한다', () => {
    expect(isBlank(' ')).toBe(true);
  });

  it('문자가 공백이 아니면 false를 반환한다', () => {
    expect(isBlank('a')).toBe(false);
  });
});

describe('assert', () => {
  it('조건이 참이면 에러를 던지지 않는다', () => {
    expect(() => assert(true)).not.toThrow();
  });

  it('조건이 거짓이면 에러를 던진다', () => {
    expect(() => assert(false)).toThrow('Invalid condition');
  });

  it('조건이 거짓이고 에러 메시지가 제공된 경우 사용자 정의 에러 메시지를 던져야 한다', () => {
    const customMessage = 'Custom error message';

    expect(() => assert(false, customMessage)).toThrow(customMessage);
  });
});
