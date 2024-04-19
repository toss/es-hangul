---
title: hangulIncludes
---

# hangulIncludes

Checks if a Hangul string contains another Hangul string.

For example, `사과` ('apple') contains `삭`, and `값이 비싸다` ('it is expensive') contains `갑` or `빘`.

```typescript
function hangulIncludes(
  // The string to be checked for containing the second argument y
  x: string,
  // The string to be checked for inclusion in the first argument x
  y: string
): boolean;
```

## Examples

```typescript
hangulIncludes('사과', ''); // true
hangulIncludes('사과', 'ㅅ'); // true
hangulIncludes('사과', '삭'); // true
hangulIncludes('사과', '삽'); // false
hangulIncludes('사과', '사과'); // true
```
