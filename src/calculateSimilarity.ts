import { disassembleHangul } from './disassemble';

export function calculateSimilarity(a: string, b: string): number {
  const disassembleAndClean = (text: string) => disassembleHangul(text).replace(/\s/g, '');

  const disassembledA = disassembleAndClean(a);
  const disassembledB = disassembleAndClean(b);

  const maxLength = Math.max(disassembledA.length, disassembledB.length);
  if (maxLength === 0) {
    return 100;
  }

  const distance = levenshtein(disassembledA, disassembledB);
  const similarity = ((maxLength - distance) / maxLength) * 100;

  return similarity;
}

const initializeLevenshteinMatrix = (rows: number, cols: number): number[][] =>
  Array.from({ length: rows }, (_, i) => Array.from({ length: cols }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)));

const computeLevenshteinRow = (prevRow: number[], bChar: string, a: string): number[] =>
  a.split('').reduce(
    (newRow, aChar, j) => {
      newRow[j + 1] = bChar === aChar ? prevRow[j] : Math.min(prevRow[j] + 1, newRow[j] + 1, prevRow[j + 1] + 1);
      return newRow;
    },
    [prevRow[0] + 1]
  );

const computeLevenshteinDistance = (a: string, b: string, matrix: number[][]): number =>
  b.split('').reduce((prevRow, bChar) => computeLevenshteinRow(prevRow, bChar, a), matrix[0])[a.length];

// https://en.wikipedia.org/wiki/Levenshtein_distance
const levenshtein = (a: string, b: string): number => {
  const matrix = initializeLevenshteinMatrix(b.length + 1, a.length + 1);
  return computeLevenshteinDistance(a, b, matrix);
};
