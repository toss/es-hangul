---
"es-hangul": patch
---

fix(assemble): 빈 배열을 인자로 받을 때 TypeError가 발생하던 문제를 수정합니다. 이제 `assemble([])`은 빈 문자열을 반환합니다.
