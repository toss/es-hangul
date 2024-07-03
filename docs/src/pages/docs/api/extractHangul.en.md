---
title: extractHangul
---

# extractHangul

Extracts and returns only Korean characters from the string.

For detailed examples, see below.

```typescript
function extractHangul(str: string): string;
```

## Examples

```tsx
extractHangul('안녕하세요1234abc'); // '안녕하세요'
extractHangul('abcde'); // ''
extractHangul('안녕하세요ㄱㄴ'); // '안녕하세요ㄱㄴ'
extractHangul('안녕하세요    만나서 반갑습니다'); // '안녕하세요    만나서 반갑습니다'
extractHangul('가나다!-29~라마바.,,사'); // '가나다라마바사'
```
