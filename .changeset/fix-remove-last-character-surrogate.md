---
'es-hangul': patch
---

fix: `removeLastCharacter`가 이모지처럼 코드 유닛 두 개로 된 문자를 반쪽만 지우던 문제를 수정합니다. (예: `removeLastCharacter('안녕😀')` → `'안녕'`)
