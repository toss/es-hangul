---
title: phoneticNotation
---

# phoneticNotation

한글 문자열을 음성 표기법으로 변경합니다.

자세한 예시는 아래 Example을 참고하세요.

```typescript
function phoneticNotation(hangul: string): string;
```

## Examples

```tsx
phoneticNotation('디귿이'); // '디그시'
phoneticNotation('굳이'); // '구지'
phoneticNotation('담요'); // '딤뇨'
phoneticNotation('침략'); // '침냑'
phoneticNotation('먹는'); // '멍는'
phoneticNotation('신라'); // '실라'
phoneticNotation('놓고'); // '노코'
phoneticNotation('깎아'); // '까까'
phoneticNotation('닭을'); // '달글'
phoneticNotation('닦다'); // '닥다'
phoneticNotation('넋'); // '넉'
phoneticNotation('젊다'); // '점다'
```
