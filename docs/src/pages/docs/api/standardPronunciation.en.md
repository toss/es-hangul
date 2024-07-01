---
title: standardPronunciation
---

# standardPronunciation

Change the Hangul string to standard pronunciation.

For detailed examples, see below.

```typescript
function standardPronunciation(
  // Input a Hangul string
  hangul: string,
  options: {
    // Set whether to apply hard sounds. Default is true."
    hardConversion: boolean;
  } = { hardConversion: true }
): string;
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
standardPronunciation('곧이듣다'); // '고지듣따'
standardPronunciation('곧이듣다', { hardConversion: false }); // '고지듣다'
standardPronunciation('닦다'); // '닥따'
standardPronunciation('닦다', { hardConversion: false }); // '닥다'
standardPronunciation('있다'); // '읻따'
standardPronunciation('있다', { hardConversion: false }); // '읻다'
standardPronunciation('핥다'); // '할따'
standardPronunciation('핥다', { hardConversion: false }); // '할다'
standardPronunciation('젊다'); // '점따'
standardPronunciation('젊다', { hardConversion: false }); // '점다'
```
