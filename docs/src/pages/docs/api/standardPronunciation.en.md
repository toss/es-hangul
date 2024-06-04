---
title: standardPronunciation
---

# standardPronunciation

Change the Hangul string to standard pronunciation.

For detailed examples, see below.

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
