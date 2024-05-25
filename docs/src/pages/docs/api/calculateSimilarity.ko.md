---
title: calculateSimilarity
---

# calculateSimilarity

두 한글 문자열의 유사도를 계산하여 0에서 100 사이의 값을 반환합니다. 이 함수는 es-hangul 라이브러리의 disassembleHangul 메서드를 사용하여 한글 문자열을 자모 단위로 분해하고, Levenshtein 거리 알고리즘을 이용해 문자열 간의 최소 편집 거리를 계산한 후 이를 바탕으로 유사도를 계산합니다.

```tsx
function calculateSimilarity(
  // 비교할 첫 번째 한글 문자열
  a: string,
  // 비교할 두 번째 한글 문자열
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