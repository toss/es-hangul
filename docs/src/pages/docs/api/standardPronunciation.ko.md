---
title: standardPronunciation
---

# standardPronunciation

한글 문자열을 표준 발음법으로 변경합니다.

자세한 예시는 아래 Example을 참고하세요.

```typescript
function standardPronunciation(
  // 한글 문자열을 입력합니다.
  hangul: string,
  options: {
    // 경음화 등의 된소리를 적용할지 여부를 설정합니다. 기본값은 true입니다.
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
