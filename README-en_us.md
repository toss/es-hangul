![es-hangul logo](https://github.com/toss/es-hangul/assets/69495129/433ddc8c-b32d-4c4c-8b60-5cc9cbe315d3)

# es-hangul

[한국어](https://github.com/toss/es-hangul/blob/main/README.md) | English

es-hangul is a library that makes it easy to handle [Hangul](https://en.wikipedia.org/wiki/Hangul) in JavaScript. It provides a modern API that is easy to use. Because it uses ECMAScript Modules, users can download the minimum amount of code when used in a browser environment.

## Examples

You can easily implement tasks related to Hangul, such as initial consonant search and attaching particles(josas).

```tsx
import { getChoseong } from 'es-hangul';

const searchWord = '라면';
const userInput = 'ㄹㅁ';

const result = getChoseong(searchWord); // ㄹㅁ

// Check if the 'choseong' of the search word match the user input
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

## Contributing

We welcome contribution from everyone in the community. Read below for detailed contribution guide.

[CONTRIBUTING](https://github.com/toss/es-hangul/blob/main/.github/CONTRIBUTING.md)

## License

MIT © Viva Republica, Inc. See [LICENSE](https://github.com/toss/es-hangul/blob/main/LICENSE) for details.

<a title="토스" href="https://toss.im">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://static.toss.im/logos/png/4x/logo-toss-reverse.png">
    <img alt="토스" src="https://static.toss.im/logos/png/4x/logo-toss.png" width="100">
  </picture>
</a>
