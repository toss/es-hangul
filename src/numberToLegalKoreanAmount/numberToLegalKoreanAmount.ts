export function numberToLegalKoreanAmount(input: number) {
  const result: number[] = [];
  let a = input.toString();

  while (a.length > 4) {
    const decimalPart = a.slice(-4);
    result.unshift(Number(decimalPart));

    a = a.slice(0, -4);
  }

  if (a.length > 0) {
    result.unshift(Number(a));
  }

  return result;
}
