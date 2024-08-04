<<<<<<< HEAD
=======
---
title: canBe
---

>>>>>>> v2
# canBeChoseong

Check if a given character can be a choseong in Korean.

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

Check if a given character can be a jungseong in Korean.

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

Check if a given character can be a jongseong in Korean.

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
