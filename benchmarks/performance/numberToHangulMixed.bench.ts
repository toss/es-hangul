import { bench, describe } from 'vitest';

import { HANGUL_DIGITS } from '../../src/_internal/constants';

function originalFunction(input: number, options?: { spacing?: boolean }): string {
  if (typeof input !== 'number' || Number.isNaN(input)) {
    throw new Error('유효한 숫자를 입력해주세요.');
  }

  if (input === Infinity) {
    return '무한대';
  }
  if (input === -Infinity) {
    return '-무한대';
  }
  if (input === 0) {
    return '0';
  }

  const isNegative = input < 0;
  const absoluteInput = Math.abs(input);

  const [integerPart, decimalPart] = absoluteInput.toString().split('.');

  const koreanParts: string[] = [];
  let remainingDigits = integerPart;
  let placeIndex = 0;

  while (remainingDigits.length > 0) {
    const currentPart = remainingDigits.slice(-4);

    if (Number(currentPart) > 0) {
      koreanParts.unshift(`${Number(currentPart).toLocaleString()}${HANGUL_DIGITS[placeIndex]}`);
    }

    koreanParts.unshift('');

    remainingDigits = remainingDigits.slice(0, -4);
    placeIndex++;
  }

  let result = koreanParts
    .filter(part => part !== '')
    .join(options?.spacing ? ' ' : '')
    .trim();

  if (integerPart === '0') {
    result = '0';
  }
  if (decimalPart) {
    result += '.' + decimalPart;
  }
  return isNegative ? '-' + result : result;
}

function improvedNumberToHangulMixed(input: number, options?: { spacing?: boolean }): string {
  if (typeof input !== 'number' || Number.isNaN(input)) {
    throw new Error('유효한 숫자를 입력해주세요.');
  }

  if (input === Infinity) {
    return '무한대';
  }
  if (input === -Infinity) {
    return '-무한대';
  }
  if (input === 0) {
    return '0';
  }

  const isNegative = input < 0;
  const absoluteInput = Math.abs(input);

  const [integerPart, decimalPart] = absoluteInput.toString().split('.');

  const koreanParts: string[] = [];
  let remainingDigits = integerPart;
  let placeIndex = 0;

  while (remainingDigits.length > 0) {
    const currentPart = remainingDigits.slice(-4);
    const numericValue = Number(currentPart);

    if (numericValue > 0) {
      const formattedPart = `${numericValue.toLocaleString()}${HANGUL_DIGITS[placeIndex]}`;
      koreanParts.unshift(formattedPart);
    }

    remainingDigits = remainingDigits.slice(0, -4);
    placeIndex++;
  }

  let result: string;
  if (integerPart === '0') {
    result = '0';
  } else {
    result = options?.spacing ? koreanParts.join(' ') : koreanParts.join('');
  }

  if (decimalPart) {
    result += '.' + decimalPart;
  }

  return isNegative ? '-' + result : result;
}

const testData = {
  small: [123, 1234, 5678, 9999],
  medium: [12345, 123456, 654321, 999999],
  large: [1234567, 12345678, 87654321, 99999999],
  veryLarge: [123456789, 1234567890, 9876543210, 12345678901234],
  mixed: [0, 1, 10, 100, 1000, 10000, 100000, 1000000],
  negative: [-123, -12345, -1234567, -123456789],
  decimal: [123.45, 12345.67, 1234567.89, 123456789.01],
  edgeCases: [0, 1, 10000, 100000000],
};

describe('정확성 검증', () => {
  const verificationCases = [
    { input: 12345, spacing: false },
    { input: 123456789, spacing: false },
    { input: 12345, spacing: true },
    { input: 0, spacing: false },
    { input: -12345, spacing: false },
  ];

  verificationCases.forEach(({ input, spacing }) => {
    bench(`정확성 체크: ${input} (spacing: ${spacing})`, () => {
      const originalResult = originalFunction(input, { spacing });
      const improvedResult = improvedNumberToHangulMixed(input, { spacing });

      if (originalResult !== improvedResult) {
        throw new Error(`결과 불일치 - Input: ${input}, Original: "${originalResult}", Improved: "${improvedResult}"`);
      }

      return originalResult;
    });
  });
});

describe('numberToHangulMixed 성능 비교', () => {
  describe('작은 숫자 (1-9999)', () => {
    bench('Original Function', () => {
      testData.small.forEach(num => originalFunction(num));
    });

    bench('Improved Function', () => {
      testData.small.forEach(num => improvedNumberToHangulMixed(num));
    });
  });

  describe('중간 숫자 (10000-999999)', () => {
    bench('Original Function', () => {
      testData.medium.forEach(num => originalFunction(num));
    });

    bench('Improved Function', () => {
      testData.medium.forEach(num => improvedNumberToHangulMixed(num));
    });
  });

  describe('큰 숫자 (1000000-99999999)', () => {
    bench('Original Function', () => {
      testData.large.forEach(num => originalFunction(num));
    });

    bench('Improved Function', () => {
      testData.large.forEach(num => improvedNumberToHangulMixed(num));
    });
  });

  describe('spacing 옵션 포함', () => {
    bench('Original Function - With Spacing', () => {
      testData.medium.forEach(num => originalFunction(num, { spacing: true }));
    });

    bench('Improved Function - With Spacing', () => {
      testData.medium.forEach(num => improvedNumberToHangulMixed(num, { spacing: true }));
    });
  });

  describe('음수 처리', () => {
    bench('Original Function - Negative Numbers', () => {
      testData.negative.forEach(num => originalFunction(num));
    });

    bench('Improved Function - Negative Numbers', () => {
      testData.negative.forEach(num => improvedNumberToHangulMixed(num));
    });
  });

  describe('소수점 처리', () => {
    bench('Original Function - Decimal Numbers', () => {
      testData.decimal.forEach(num => originalFunction(num));
    });

    bench('Improved Function - Decimal Numbers', () => {
      testData.decimal.forEach(num => improvedNumberToHangulMixed(num));
    });
  });

  describe('대용량 처리 (1000회 반복)', () => {
    const repeatCount = 1000;
    const testNum = 123456789;

    bench('Original Function - Heavy Load', () => {
      for (let i = 0; i < repeatCount; i++) {
        originalFunction(testNum + i);
      }
    });

    bench('Improved Function - Heavy Load', () => {
      for (let i = 0; i < repeatCount; i++) {
        improvedNumberToHangulMixed(testNum + i);
      }
    });
  });

  describe('메모리 집약적 테스트', () => {
    bench('Original Function - Memory Intensive', () => {
      const results = [];
      for (let i = 0; i < 100; i++) {
        results.push(originalFunction(Math.floor(Math.random() * 1000000000)));
      }
      return results.length;
    });

    bench('Improved Function - Memory Intensive', () => {
      const results = [];
      for (let i = 0; i < 100; i++) {
        results.push(improvedNumberToHangulMixed(Math.floor(Math.random() * 1000000000)));
      }
      return results.length;
    });
  });
});
