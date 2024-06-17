---
title: amountsToHangul
---

# amountsToHangul

숫자로 된 금액을 [국립국어원](https://ko.dict.naver.com/#/correct/korean/info?seq=602) 규칙의 한글 읽기로 변환합니다.

자세한 예시는 아래 Example을 참고하세요.

```typescript
function amountsToHangul(
  // 숫자로 된 금액 문자열
  str: string
): string;
```

## Examples

```tsx
amountsToHangul('15,201,100'); // '일천오백이십만천백';
amountsToHangul('120,030원'); // '일십이만삼십' - 숫자 외 문자 무시
amountsToHangul('392.24'); // '삼백구십이' - 소수점 무시
```
