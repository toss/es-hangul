---
title: needAssemble
---

# needAssemble

Find consonants and vowels within the string and check if they can be combined with complete Korean characters.

For detailed examples, see below.

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
