---
"es-hangul": minor
---

feat: 중성을 추출하는 `getJungseong`과 종성을 추출하는 `getJongseong` 함수를 추가합니다. `getChoseong`과 동일하게 존재하는 자모만 추출하고 공백은 유지합니다. (예: `getJungseong('사과')` → `'ㅏㅘ'`, `getJongseong('값')` → `'ㅄ'`)
