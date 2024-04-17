---
title: chosungIncludes
---

# chosungIncludes

문자열의 초성 일치 검색을 수행합니다.

```typescript
function chosungIncludes(
  // 초성 일치하는지 검사할 문자열 (e.g. '프론트엔드')
  x: string,
  // 초성 문자열 (e.g. 'ㅍㄹㅌㅇㄷ')
  y: string
): boolean;
```

## Examples

```typescript
chosungIncludes('프론트엔드', 'ㅍㄹㅌ'); // true
chosungIncludes('00프론트엔드', 'ㅍㄹㅌ'); // true
chosungIncludes('프론트엔드', 'ㅍㅌ'); // false
chosungIncludes('프론트엔드', '푸롴트'); // false
chosungIncludes('프론트엔드 개발자', 'ㅍㄹㅌㅇㄷ ㄱㅂㅈ'); // false
```

## Tips

공백을 포함한 단어의 검색도 처리하고 싶다면, 다음과 같이 사용해보세요!

```ts
const word = '프론트엔드 개발자';
const chosung = 'ㅍㄹㅌㅇㄷ ㄱㅂㅈ';

const trimmedWord = word.replace(/\s/g, '');
const trimmedChosung = chosung.replace(/\s/g, '');

const 유저가_입력한_초성이_단어에_맞는가 = chosungIncludes(trimmedWord, trimmedChosung);
```
