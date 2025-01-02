/**
 * str 에 현대에는 사용하지 않는 한글이 포함되어 있는가?
 *
 * @see https://www.unicode.org/charts/PDF/U1100.pdf
 */
export function includeOldHangul(str: string): boolean {
  // \u1176-\u11A7 : 현대에는 사용하지 않는 한글의 초성
  // \u1113-\u115F : 현대에는 사용하지 않는 한글의 중성
  // \u11C3-\u11FF : 현대에는 사용하지 않는 한글의 종성
  return /[\u1113-\u115F\u1176-\u11A7\u11C3-\u11FF]/.test(String(str));
}
