---
title: romanizeHangul
---

# romanizeHangul

Change the Hangul string to Roman.

For detailed examples, see below.

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
