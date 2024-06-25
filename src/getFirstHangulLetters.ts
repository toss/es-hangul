export function getFirstHangulLetters(str: string) {
  const words = str.split(' ');

  const firstHangulLetters = words.map(word => word.charAt(0));

  return firstHangulLetters;
}
