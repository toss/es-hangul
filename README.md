![es-hangul 로고](https://github.com/toss/es-hangul/assets/69495129/433ddc8c-b32d-4c4c-8b60-5cc9cbe315d3)


# es-hangul &middot; [![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/toss/slash/blob/main/LICENSE)  [![NPM badge](https://img.shields.io/npm/v/es-hangul?logo=npm)](https://www.npmjs.com/package/es-hangul)  [![Discord Badge](https://discord.com/api/guilds/1281071127052943361/widget.png?style=shield)](https://discord.gg/vGXbVjP2nY)

한국어 | [English](https://github.com/toss/es-hangul/blob/main/README-en_us.md)

`es-hangul`은 쉽게 한글을 다룰 수 있도록 돕는 JavaScript 라이브러리입니다. 편리하게 사용할 수 있는 모던한 라이브러리 API를 제공합니다. ECMAScript Modules을 사용하기 때문에, 사용자가 브라우저 환경에서 최소한의 코드를 내려받도록 할 수 있습니다.

## 사용 예시

문자열 초성화, 조사 붙이기와 같은 한글 작업을 간단히 할 수 있습니다.

```tsx
import { getChoseong } from 'es-hangul';

const searchWord = '라면';
const userInput = 'ㄹㅁ';

const result = getChoseong(searchWord); // ㄹㅁ

// 검색어의 초성과 사용자 입력 초성이 일치하는지 확인
if (result === userInput) {
  something()
}
```

```tsx
import { josa } from 'es-hangul';

const word1 = '사과';
const sentence1 = josa(word1, '을/를') + ' 먹었습니다.';
console.log(sentence1); // '사과를 먹었습니다.'

const word2 = '바나나';
const sentence2 = josa(word2, '이/가') + ' 맛있습니다.';
console.log(sentence2); // '바나나가 맛있습니다.'
```

## 기여하기

es-hangul 라이브러리에 기여하고 싶다고 생각하셨다면 아래 문서를 참고해주세요.

[CONTRIBUTING](https://github.com/toss/es-hangul/blob/main/.github/CONTRIBUTING.md)

## Thanks to
한글 관련 JavaScript 생태계에 많은 기여를 해주시고, 많은 개발자들에게 영감을 주신 아래 라이브러리 오너 분들의 기여에 특별히 감사의 말씀드립니다.
[hangul-js](https://github.com/e-/Hangul.js): 조재민님

## 라이선스

MIT © Viva Republica, Inc. [LICENSE](https://github.com/toss/es-hangul/blob/main/LICENSE) 파일을 참고하세요.

<a title="토스" href="https://toss.im">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://static.toss.im/logos/png/4x/logo-toss-reverse.png">
    <img alt="토스" src="https://static.toss.im/logos/png/4x/logo-toss.png" width="100">
  </picture>
</a>

