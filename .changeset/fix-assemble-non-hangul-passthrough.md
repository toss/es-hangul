---
"es-hangul": patch
---

fix(assemble): 숫자나 기호 등 한글이 아닌 문자가 섞인 경우 오류가 발생하던 문제를 수정합니다. 이제 한글로 조합할 수 없는 문자는 그대로 유지됩니다. 이로써 `convertQwertyToHangul('slash123')`이 `'님노123'`을 반환합니다.
