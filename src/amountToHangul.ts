export const HANGUL_DIGITS = [
  '',
  '만',
  '억',
  '조',
  '경',
  '해',
  '자',
  '양',
  '구',
  '간',
  '정',
  '재',
  '극',
  '항하사',
  '아승기',
  '나유타',
  '불가사의',
  '무량대수',
  '겁',
  '업',
];
export const HANGUL_DIGITS_MAX = HANGUL_DIGITS.length * 4;
export const HANGUL_NUMBERS = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
export const HANGUL_CARDINAL = ['', '십', '백', '천'];

export function amountToHangul(amount: string | number) {
  const [integerPart, decimalPart] = String(amount)
    .replace(/[^\d.]+/g, '')
    .split('.');

  if (integerPart.length > HANGUL_DIGITS_MAX) {
    throw new Error(`convert range exceeded : ${amount}`);
  }

  const result = [];
  let pronunDigits = true;

  for (let i = 0; i < integerPart.length - 1; i++) {
    const digit = integerPart.length - i - 1;

    if (integerPart[i] > '1' || digit % 4 === 0 || i === 0) {
      const hangulNumber = HANGUL_NUMBERS[Number(integerPart[i])];

      if (hangulNumber) {
        result.push(hangulNumber);
        pronunDigits = true;
      }
    }

    if (pronunDigits && digit % 4 === 0) {
      result.push(HANGUL_DIGITS[digit / 4]);
      pronunDigits = false;
    }

    if (integerPart[i] !== '0') {
      result.push(HANGUL_CARDINAL[digit % 4]);
    }
  }
  result.push(HANGUL_NUMBERS[Number(integerPart[integerPart.length - 1])]);

  if (decimalPart) {
    result.push('점');

    for (let i = 0; i < decimalPart.length; i++) {
      result.push(HANGUL_NUMBERS[Number(decimalPart[i])]);
    }
  }

  return result.join('');
}
