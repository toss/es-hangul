---
title: amountToMoneyUnit
---

# amountToMoneyUnit

숫자나 문자를 [국립국어원](https://ko.dict.naver.com/#/correct/korean/info?seq=602) 규칙의 한글 읽기 문자열로 변환합니다.

자세한 예시는 아래 Example을 참고하세요.

```typescript
function amountToMoneyUnit(amount: string | number): string;
```

## Examples

```tsx
amountToMoneyUnit('15,201,100'); // '일천오백이십만천백'
amountToMoneyUnit('120,030원'); // '일십이만삼십'
amountToMoneyUnit('12345.6789'); // '일만이천삼백사십오점육칠팔구'
amountToMoneyUnit(15_201_100); // '일천오백이십만천백''
```
