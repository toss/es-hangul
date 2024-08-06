---
title: disassemble
---

import { Sandpack } from '@/components/Sandpack';

# disassemble

한글 문자열을 글자별로 초성/중성/종성 단위로 완전히 분리하여, 하나의 문자열로 만듭니다.

자세한 예시는 아래 Example을 참고하세요.

```typescript
function disassemble(
  // 분리할 한글 문자열
  str: string
): string;
```

## Examples

```tsx
disassemble('값'); // 'ㄱㅏㅂㅅ'
disassemble('값이 비싸다'); // 'ㄱㅏㅂㅅㅇㅣ ㅂㅣㅆㅏㄷㅏ'
disassemble('ㅘ'); // 'ㅗㅏ'
disassemble('ㄵ'); // 'ㄴㅈ'
```

## 사용해보기

<br />

<Sandpack>

```ts index.ts
import { disassemble } from 'es-hangul';

console.log(disassemble('값'));
```

</Sandpack>
