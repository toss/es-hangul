import { josa } from './josa';

describe('josa 반환 타입', () => {
  it('빈 문자열 리터럴을 입력하면 빈 문자열 타입을 반환한다.', () => {
    expectTypeOf(josa('', '이/가')).toEqualTypeOf<''>();
  });

  it('비어 있지 않은 문자열 리터럴의 반환 타입을 유지한다.', () => {
    expectTypeOf(josa('사과', '이/가')).toEqualTypeOf<'사과이' | '사과가'>();
  });

  it('빈 문자열을 포함한 유니온에서 입력별 반환 타입을 보존한다.', () => {
    const word = '' as '' | '사과';

    expectTypeOf(josa(word, '이/가')).toEqualTypeOf<'' | '사과이' | '사과가'>();
  });

  it('일반 문자열 입력의 반환 타입에 빈 문자열을 포함한다.', () => {
    const word = '' as string;

    expectTypeOf(josa(word, '이/가')).toEqualTypeOf<'' | `${string}이` | `${string}가`>();
  });

  it('비어 있지 않은 템플릿 문자열에는 빈 반환 타입을 추가하지 않는다.', () => {
    const word = '항목-1' as `항목-${string}`;

    expectTypeOf(josa(word, '이/가')).toEqualTypeOf<`항목-${string}이` | `항목-${string}가`>();
  });

  it('브랜드 문자열에 포함된 빈 입력의 타입을 보존한다.', () => {
    type Word = string & { readonly brand: unique symbol };
    const word = '' as Word;

    expectTypeOf(josa(word, '이/가')).toEqualTypeOf<`${Word}이` | `${Word}가` | (Word & '')>();
  });

  it('타입이 지정되지 않은 입력에서도 반환 타입 정보를 유지한다.', () => {
    const word = JSON.parse('""');

    expectTypeOf(josa(word, '이/가')).not.toBeAny();
    expectTypeOf(josa(word, '이/가')).toEqualTypeOf<'' | `${typeof word}이` | `${typeof word}가`>();
  });
});
