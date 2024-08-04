---
title: canBe
---

# canBeChoseong

인자로 받은 문자가 초성으로 위치할 수 있는 문자인지 검사합니다.

```typescript
function canBeChoseong(character: string): boolean;
```

```typescript
canBeChoseong('ㄱ'); // true
canBeChoseong('ㅃ'); // true
canBeChoseong('ㄱㅅ'); // false
canBeChoseong('ㅏ'); // false
canBeChoseong('가'); // false
```

# canBeJungseong

인자로 받은 문자가 중성으로 위치할 수 있는 문자인지 검사합니다.

```typescript
function canBeJungseong(character: string): boolean;
```

```typescript
canBeJungseong('ㅏ'); // true
canBeJungseong('ㅗㅏ'); // true
canBeJungseong('ㅏㅗ'); // false
canBeJungseong('ㄱ'); // false
canBeJungseong('ㄱㅅ'); // false
canBeJungseong('가'); // false
```

# canBeJongseong

인자로 받은 문자가 종성으로 위치할 수 있는 문자인지 검사합니다.

```typescript
function canBeJongseong(character: string): boolean;
```

```typescript
canBeJongseong('ㄱ'); // true
canBeJongseong('ㄱㅅ'); // true
canBeJongseong('ㅎㄹ'); // false
canBeJongseong('가'); // false
canBeJongseong('ㅏ'); // false
canBeJongseong('ㅗㅏ'); // false
```
