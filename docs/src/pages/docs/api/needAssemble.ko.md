---
title: needAssemble
---

# needAssemble

문자열 안에서 자음과 모음을 찾고 완전한 한글 문자로 조합이 가능한지 검사합니다.

자세한 예시는 아래 Example을 참고하세요.

```typescript
function needAssemble(hangul: string): boolean;
```

## Examples

```tsx
needAssemble('아버지가 방에 들어갑니다'); // false
needAssemble('아버지가 방ㅇㅔ 들어갑니다'); // true
needAssemble('아버지가 방에 들어갑니다ㅇ'); // true
needAssemble('아버지가 방에 들어갑닏ㅏ'); // true
```
