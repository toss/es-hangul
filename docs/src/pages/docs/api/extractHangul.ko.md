---
title: extractHangul
---

# extractHangul

문자열에서 한글만 추출하여 반환합니다.

자세한 예시는 아래 Example을 참고하세요.

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
