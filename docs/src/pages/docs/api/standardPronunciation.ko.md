---
title: standardPronunciation
---

# standardPronunciation

한글 문자열을 표준 발음법으로 변경합니다.

자세한 예시는 아래 Example을 참고하세요.

```typescript
function standardPronunciation(hangul: string): string;
```

## Examples

```tsx
standardPronunciation('디귿이'); // '디그시'
standardPronunciation('굳이'); // '구지'
standardPronunciation('담요'); // '딤뇨'
standardPronunciation('침략'); // '침냑'
standardPronunciation('먹는'); // '멍는'
standardPronunciation('신라'); // '실라'
standardPronunciation('놓고'); // '노코'
standardPronunciation('깎아'); // '까까'
standardPronunciation('닭을'); // '달글'
standardPronunciation('닦다'); // '닥다'
standardPronunciation('넋'); // '넉'
standardPronunciation('젊다'); // '점다'
```
