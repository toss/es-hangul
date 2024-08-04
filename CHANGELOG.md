# es-hangul

## 1.5.0

### Minor Changes

- [#115](https://github.com/toss/es-hangul/pull/115) [`84584d4`](https://github.com/toss/es-hangul/commit/84584d48ac5ded83c55934f0b72e37a6b889f4e1) Thanks [@po4tion](https://github.com/po4tion)! - feat: 한국어를 로마자로 변환해주는 함수와 한국어를 표준 발음법으로 변환해주는 함수를 만들고 문서화를 진행합니다

## 1.4.7

### Patch Changes

- [#201](https://github.com/toss/es-hangul/pull/201) [`56db7f0`](https://github.com/toss/es-hangul/commit/56db7f0140ee369fbe0dc2dad834e8d6a218a4ea) Thanks [@BO-LIKE-CHICKEN](https://github.com/BO-LIKE-CHICKEN)! - feat: 숫자를 순 우리말 수사로 변환하거나 수 관형사로 변환하는 함수를 추가

## 1.4.6

### Patch Changes

- [#198](https://github.com/toss/es-hangul/pull/198) [`e6142b0`](https://github.com/toss/es-hangul/commit/e6142b04159133dbcab6f2771baa88adf7aa4a45) Thanks [@linenumbertwo](https://github.com/linenumbertwo)! - feat: "이라/라" 케이스 추가

- [#203](https://github.com/toss/es-hangul/pull/203) [`fbe3ad6`](https://github.com/toss/es-hangul/commit/fbe3ad67f4bd796773f60f0ab04359135b03d414) Thanks [@kangju2000](https://github.com/kangju2000)! - fix: eslint CI가 제대로 작동하지 않는 문제를 수정합니다.

## 1.4.5

### Patch Changes

- [#138](https://github.com/toss/es-hangul/pull/138) [`6160363`](https://github.com/toss/es-hangul/commit/6160363abea439cb2e320704fdb6b7b503b28961) Thanks [@Collection50](https://github.com/Collection50)! - fix: chosung => choseong으로 변환하는 규칙을 적용합니다

## 1.4.4

### Patch Changes

- [#168](https://github.com/toss/es-hangul/pull/168) [`e3d0259`](https://github.com/toss/es-hangul/commit/e3d0259561a0e14df13e1aea31ecc3c5c8253150) Thanks [@jungwoo3490](https://github.com/jungwoo3490)! - fix: amountToHangul이 선행 0이 있는 문자열을 잘못 변환하는 오류를 수정합니다.

## 1.4.3

### Patch Changes

- [#156](https://github.com/toss/es-hangul/pull/156) [`8a9ba36`](https://github.com/toss/es-hangul/commit/8a9ba364aa5debae204028b4b1cf1b2568575c0e) Thanks [@seungrodotlee](https://github.com/seungrodotlee)! - fix. 겹모음과 관련하여 일부 메소드에서 잘못된 동작을 수정합니다.

## 1.4.2

### Patch Changes

- [#159](https://github.com/toss/es-hangul/pull/159) [`aaddf6f`](https://github.com/toss/es-hangul/commit/aaddf6f91a9c82a939cf333d29cdd875b358e8cd) Thanks [@crucifyer](https://github.com/crucifyer)! - fix: 소수점 추가 후 발생한 '영'읽기 버그 수정

## 1.4.1

### Patch Changes

- [#157](https://github.com/toss/es-hangul/pull/157) [`f7e60ae`](https://github.com/toss/es-hangul/commit/f7e60aeca9f315ac1e34eba0a1f8a82f55d79956) Thanks [@manudeli](https://github.com/manudeli)! - fix: 패키지가 노출하는 인터페이스를 명확히 하기 위해 index.ts를 named export로 수정합니다

## 1.4.0

### Minor Changes

- [#144](https://github.com/toss/es-hangul/pull/144) [`b114897`](https://github.com/toss/es-hangul/commit/b1148973e6c2b640ce528fc8ba4b8e2e034b90de) Thanks [@Collection50](https://github.com/Collection50)! - fix: amountToHangul이 소수점, 숫자도 대응할 수 있도록 수정

## 1.3.10

### Patch Changes

- [#148](https://github.com/toss/es-hangul/pull/148) [`f3c7fe9`](https://github.com/toss/es-hangul/commit/f3c7fe9f73138b932af817b8ac925d54c3283151) Thanks [@KNU-K](https://github.com/KNU-K)! - fix : getHangulacronym함수를 acronymizeHangul 메서드로 대체합니다

## 1.3.9

### Patch Changes

- [#130](https://github.com/toss/es-hangul/pull/130) [`acd6edb`](https://github.com/toss/es-hangul/commit/acd6edb1d8aadced517f6b57a49c01152ff19d0a) Thanks [@Collection50](https://github.com/Collection50)! - feat: 문자열에서 한글만 반환하는 extractHangul을 구현합니다.

## 1.3.8

### Patch Changes

- [#133](https://github.com/toss/es-hangul/pull/133) [`b0e1184`](https://github.com/toss/es-hangul/commit/b0e1184204be0cb9f3c13937888c83c8a94e7ca6) Thanks [@KNU-K](https://github.com/KNU-K)! - feat : 문장의 각 단어 중 첫 문자만 뽑는 extractHangul 함수를 추가합니다.

## 1.3.7

### Patch Changes

- [#124](https://github.com/toss/es-hangul/pull/124) [`0f38431`](https://github.com/toss/es-hangul/commit/0f38431ee611cb89c7e121fd02ab34f749a0c386) Thanks [@crucifyer](https://github.com/crucifyer)! - fix: 코드 효율 개선

## 1.3.6

### Patch Changes

- [#125](https://github.com/toss/es-hangul/pull/125) [`a56e591`](https://github.com/toss/es-hangul/commit/a56e5913bec1e0bb6d1462192ee01d14a00449d5) Thanks [@crucifyer](https://github.com/crucifyer)! - feat: 숫자로 된 금액을 국립국어원 규칙의 한글 읽기로 변환합니다.

## 1.3.5

### Patch Changes

- [#95](https://github.com/toss/es-hangul/pull/95) [`f95daf9`](https://github.com/toss/es-hangul/commit/f95daf97d37268923e1c1a482c61d6ad19d31c5c) Thanks [@manudeli](https://github.com/manudeli)! - ci(TypeScript): lint by arethetypeswrong

## 1.3.4

### Patch Changes

- [#93](https://github.com/toss/es-hangul/pull/93) [`4195df5`](https://github.com/toss/es-hangul/commit/4195df54d72f1decbcf6ea27faf525a4f4f66241) Thanks [@manudeli](https://github.com/manudeli)! - ci(package.json): lint by publint

## 1.3.3

### Patch Changes

- [#90](https://github.com/toss/es-hangul/pull/90) [`91a46a2`](https://github.com/toss/es-hangul/commit/91a46a280d7b054a1ac0fb58bfe5ff6aaa05ea33) Thanks [@youngjae99](https://github.com/youngjae99)! - feat: add convertQwertyToHangulAlphabet, disassembleCompleteHangulCha…

## 1.3.2

### Patch Changes

- [#86](https://github.com/toss/es-hangul/pull/86) [`28fb57a`](https://github.com/toss/es-hangul/commit/28fb57aa73466767dd33ec801799180f71c94aae) Thanks [@kangju2000](https://github.com/kangju2000)! - fix: 인자로 빈 문자열이 들어올 경우 얼리리턴하도록 수정

- [#67](https://github.com/toss/es-hangul/pull/67) [`7c030df`](https://github.com/toss/es-hangul/commit/7c030dfb7f8c050b082b3ab3b4f760c39fbe4413) Thanks [@BO-LIKE-CHICKEN](https://github.com/BO-LIKE-CHICKEN)! - fix: 초성을 뜻하는 단어를 통일

- [#83](https://github.com/toss/es-hangul/pull/83) [`1292575`](https://github.com/toss/es-hangul/commit/12925756c20ef26da86dc3c38f3c6608eb0c2176) Thanks [@jungwoo3490](https://github.com/jungwoo3490)! - fix: 호환성 개선을 위해 배열의 마지막 요소 가져오는 부분 수정

- [#75](https://github.com/toss/es-hangul/pull/75) [`f2b7cd9`](https://github.com/toss/es-hangul/commit/f2b7cd9d15f1deebd36c17bf2924f4abfe20467b) Thanks [@ssi02014](https://github.com/ssi02014)! - refac: convertQwertyToHangul split 및 Non-null assertion operator 제거, 네이밍 오타 수정

## 1.3.1

### Patch Changes

- [#68](https://github.com/toss/es-hangul/pull/68) [`0c784ff`](https://github.com/toss/es-hangul/commit/0c784ffadddf0353c8232a6d487f74f63d8695bf) Thanks [@99mini](https://github.com/99mini)! - feat: 영문 알파벳을 qwerty 자판에 매칭되는 한글로 변환하는 함수 추가

## 1.3.0

### Minor Changes

- [#64](https://github.com/toss/es-hangul/pull/64) [`ed33cd9`](https://github.com/toss/es-hangul/commit/ed33cd904decad440c38d6d4d5bbf596c1c552f7) Thanks [@evan-moon](https://github.com/evan-moon)! - feat: 한글 문장과 문자가 담긴 배열을 인자로 받아 규칙에 맞게 합성하는 `assemble` 함수 추가

## 1.2.1

### Patch Changes

- [#42](https://github.com/toss/es-hangul/pull/42) [`f668e15`](https://github.com/toss/es-hangul/commit/f668e15318744e2c0195a826ef0d963de26072cb) Thanks [@BO-LIKE-CHICKEN](https://github.com/BO-LIKE-CHICKEN)! - fix: Handle spaces in initialConsonants search inputs properly

## 1.2.0

### Minor Changes

- [#56](https://github.com/toss/es-hangul/pull/56) [`e25b8b5`](https://github.com/toss/es-hangul/commit/e25b8b5d8b7a5739a66163233779f5cfa7ed8cdb) Thanks [@evan-moon](https://github.com/evan-moon)! - feat: removeLastHangulCharacter 추가

## 1.1.0

### Minor Changes

- [#53](https://github.com/toss/es-hangul/pull/53) [`314f0a9`](https://github.com/toss/es-hangul/commit/314f0a94e49aaa3202d724a0ae5a3cd4574e6bc3) Thanks [@evan-moon](https://github.com/evan-moon)! - feat: 한글 자모음을 인자로 입력받아 한글 문자로 합성하는 함수 추가

## 1.0.9

### Patch Changes

- [#36](https://github.com/toss/es-hangul/pull/36) [`1664575`](https://github.com/toss/es-hangul/commit/16645753056faa9702be5c50f1042618c032b186) Thanks [@evan-moon](https://github.com/evan-moon)! - feat: 인자로 받은 문자의 초성, 중성, 종성 위치 가능 여부를 파악하는 함수 추가 #24

## 1.0.8

### Patch Changes

- 73f221a: docs: nextra의 필요한 기능을 사용하고 문서를 간단명료하게 수정합니다

## 1.0.7

### Patch Changes

- b7df997: feat: Strictly manage constants by adding hasValueInStringList, hasPr…

## 1.0.6

### Patch Changes

- 5af6f19: chore: github action + changeset을 테스트하기 위함입니다.

## 1.0.5

### Patch Changes

- 3903d6f: chore: github action + changeset을 테스트하기 위함입니다.

## 1.0.4

### Patch Changes

- 571d5b0: changeset 작동을 테스트합니다
