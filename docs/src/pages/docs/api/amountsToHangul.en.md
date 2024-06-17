---
title: amountsToHangul
---

# amountsToHangul

Converts numeric amounts to the Korean reading of the [National Institute of Korean Language](https://ko.dict.naver.com/#/correct/korean/info?seq=602) rules.

For detailed examples, see below.

```typescript
function amountsToHangul(
  // A string of numeric amounts
  str: string
): string;
```

## Examples

```tsx
amountsToHangul('15,201,100'); // '일천오백이십만천백';
amountsToHangul('120,030원'); // '일십이만삼십' - Ignore non-numeric characters
amountsToHangul('392.24'); // '삼백구십이' - Ignore decimals
```
