---
title: amountToMoneyCurrency
---

# amountToMoneyCurrency

Converts numeric amounts to the Korean reading of the [National Institute of Korean Language](https://ko.dict.naver.com/#/correct/korean/info?seq=602) rules.

For detailed examples, see below.

```typescript
function amountToMoneyCurrency(amount: string | number): string;
```

## Examples

```tsx
amountToMoneyCurrency('15,201,100'); // '일천오백이십만천백'
amountToMoneyCurrency('120,030원'); // '일십이만삼십'
amountToMoneyCurrency('12345.6789'); // '일만이천삼백사십오점육칠팔구'
amountToMoneyCurrency(15_201_100); // '일천오백이십만천백''
```
