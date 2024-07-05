import { getSimilarity } from './getSimilarity';

describe('getSimilarity', () => {
  it('동일한 문자열의 유사도는 100이어야 한다', () => {
    const left = '안녕하세요';
    const right = '안녕하세요';
    const result = getSimilarity(left, right);
    expect(result).toBe(1);
  });

  it('완전히 다른 문자열의 유사도는 10이하여야한다', () => {
    const left = '안녕하세요';
    const right = 'ㅂㅈㄷㄱㅅㅁ';
    const result = getSimilarity(left, right);

    expect(result).toBeLessThanOrEqual(0.1);
  });

  it('부분적으로 일치하는 문자열의 유사도는 정확하게 계산되어야 한다', () => {
    const left = '안녕하세요';
    const right = '안녕하새요';
    const result = getSimilarity(left, right);
    expect(result).toBeCloseTo(0.916, 2);
  });

  it('입력 문자열이 빈 문자열일 때 유사도는 0이어야 한다', () => {
    const left = '안녕하세요';
    const right = '';
    const result = getSimilarity(left, right);
    expect(result).toBe(0);
  });

  it('대상 문자열이 빈 문자열일 때 유사도는 0이어야 한다', () => {
    const left = '';
    const right = '안녕하세요';
    const result = getSimilarity(left, right);
    expect(result).toBe(0);
  });

  it('두 문자열이 모두 빈 문자열일 때 유사도는 100이어야 한다', () => {
    const left = '';
    const right = '';
    const result = getSimilarity(left, right);
    expect(result).toBe(100);
  });

  it('부분적으로 일치하는 문자열 동해물과 동해붇ㄹㅁ과의 유사도는 정확하게 계산되어야 한다', () => {
    const left = '동해물과';
    const right = '동해붇ㄹㅁ과';
    const result = getSimilarity(left, right);
    expect(result).toBeCloseTo(0.769, 2);
  });

  it('복잡한 문자열 비교 시 유사도는 정확하게 계산되어야 한다', () => {
    const left = '대한민국';
    const right = '대한밍굮';
    const result = getSimilarity(left, right);
    expect(result).toBeCloseTo(0.818, 2);
  });

  it('길이가 다른 문자열 비교 시 유사도는 정확하게 계산되어야 한다', () => {
    const left = '가나다라마바사';
    const right = '나다라마바사가';
    const result = getSimilarity(left, right);
    expect(result).toBeCloseTo(0.714, 2);
  });

  describe('한글 이외의 문자가 섞인 문자열인 경우', () => {
    it('한글과 영어가 섞여도 유사도를 계산할 수 있다', () => {
      const left = '안녕하hello세요';
      const right = 'foo안녕하bar세요baz';

      const result = getSimilarity(left, right);
      expect(result).toBeCloseTo(0.476, 2);
    });

    it('한글과 숫자가 섞여도 유사도를 계산할 수 있다', () => {
      const left = '안녕하123세요';
      const right = 'foo안녕하456bar세요baz';

      const result = getSimilarity(left, right);
      expect(result).toBeCloseTo(0.5, 2);
    });

    it('한글과 특수문자가 섞여도 유사도를 계산할 수 있다', () => {
      const left = '안녕하!@#$세요';
      const right = 'foo안녕하%^&bar세요baz';

      const result = getSimilarity(left, right);
      expect(result).toBeCloseTo(0.5, 2);
    });
  });
});
