---
title: calculateSimilarity
---

# calculateSimilarity

Calculates the similarity between two Korean strings and returns a value between 0 and 100. This function uses the disassembleHangul method from the es-hangul library to break down the Korean strings into their component characters (jamo) and then calculates the minimum edit distance between the strings using the Levenshtein distance algorithm. The similarity is then calculated based on this distance.

```tsx
function calculateSimilarity()
  a: string,
  b: string
): number;
```

## Examples

```tsx
calculateSimilarity('안녕하세요', '안녕하세요'); // 100
calculateSimilarity('안녕하세요', '안녕하새요'); // 약 91.67
calculateSimilarity('동해물과', '동해붇ㄹㅁ과'); // 약 76.92
calculateSimilarity('대한민국', '대한밍굮'); // 약 81.82
calculateSimilarity('가나다라마바사', '나다라마바사가'); // 약 71.43
```