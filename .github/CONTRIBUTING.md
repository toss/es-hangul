# es-hangul 라이브러리에 기여하기

커뮤니티의 모든 분들의 기여를 환영합니다.

> 모든 기여자는 우리의 행동 강령을 준수해야 합니다.
> <br/>어떤 행동이 허용되고 허용되지 않는지 이해하려면 [전문](./CODE_OF_CONDUCT.md)을 읽어주세요.

## 1. Issues

다음과 같은 방법으로 es-hangul 라이브러리에 기여할 수 있습니다:

- Improving our [docs](https://slash.page)
- [Reporting a bug in our issues tab](https://github.com/toss/slash/issues/new/choose)
- [Requesting a new feature or package](https://github.com/toss/slash/issues/new/choose)
- [Having a look at our issue list](https://github.com/toss/slash/issues) to see what's to be fixed

## 2. Pull Requests

> [Opening a pull request](https://github.com/toss/slash/compare) <br/>

자신의 PR을 제출할 수 있습니다. PR의 제목은 다음 형식과 일치해야 합니다:

```
<type>: <description>
```

> 우리는 당신의 이력에 있는 커밋의 수나 스타일을 중요시하지 않습니다, 왜냐하면 우리는 모든 PR을 main으로 squash merge하기 때문입니다. <br/>
> 편하게 커밋하세요.

### 2.1 Type

**Type 은 아래의 것들 중 하나여야 합니다.**

배포된 코드를 변경한 경우 :

- feat - 새로운 기능 추가에 대해
- fix - 새로운 기능을 추가하지 않는 수정에 대해

배포된 코드를 변경하지 않은 경우 :

- docs - 문서만 변경한 경우
- test - 테스트만 변경한 경우

그 외 :

- chore - 그 외 모든 것

### 2.2 Description

A clear and concise description of what the pr is about.

## 3. Convention

es-hangul에서 제공하는 메서드들은 특별한 이유가 없다면, hangul이라는 맥락을 드러내는 것을 지향합니다.

```ts
// Don't
function getSimilarity();
// Do
function getHangulSimilarity();

// Don't
function disassemble();
// Do
function disassembleHangul();
```

메서드명 자체에서 한글을 다룬다는 사실이 명확히 느껴진다면, 생략할 수 있습니다

```ts
// Don't
function getHangulJosa();
// Do
function josa();
```

- [래퍼런스](https://github.com/toss/es-hangul/issues/121)
