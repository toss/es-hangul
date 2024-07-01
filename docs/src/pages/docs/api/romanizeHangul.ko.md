---
title: romanizeHangul
---

# romanizeHangul

한글 문자열을 로마자로 변경합니다.

자세한 예시는 아래 Example을 참고하세요.

```typescript
function romanizeHangul(hangul: string): string;
```

## Examples

```tsx
romanizeHangul('백마'); // 'baengma'
romanizeHangul('학여울'); // 'hangnyeoul'
romanizeHangul('해돋이'); // 'haedoji'
romanizeHangul('좋고'); // 'joko'
romanizeHangul('압구정'); // 'apgujeong'
romanizeHangul('구미'); // 'gumi'
romanizeHangul('대관령'); // 'daegwallyeong'
romanizeHangul('ㄱ'); // 'g'
romanizeHangul('한국어!'); // 'hangugeo!'
romanizeHangul('안녕하세요'); // 'annyeonghaseyo'
```
