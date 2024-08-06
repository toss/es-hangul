---
title: disassembleToGroups
---

import { Sandpack } from '@/components/Sandpack';

# disassembleToGroups

한글 문자열을 글자별로 초성/중성/종성 단위로 완전히 분리합니다.

`ㄵ`와 같은 겹자음은 `['ㄴ', 'ㅈ']`와 같이 풀고, `ㅘ`와 같은 겹모음은 `['ㅗ', 'ㅏ']`와 같이 풉니다.

자세한 예시는 아래 Example을 참고하세요.

```typescript
function disassembleToGroups(
  // 분리할 한글 문자열
  str: string
): string[][];
```

## Examples

```typescript
disassembleToGroups('사과'); // [['ㅅ', 'ㅏ'], ['ㄱ', 'ㅗ', 'ㅏ']]
disassembleToGroups('ㅘ'); // [['ㅗ', 'ㅏ']]
disassembleToGroups('ㄵ'); // [['ㄴ', 'ㅈ']]
```

## 사용해보기

<br />

<Sandpack>

```ts index.ts
import { disassembleToGroups } from 'es-hangul';

console.log(disassembleToGroups('사과'));
```

</Sandpack>
