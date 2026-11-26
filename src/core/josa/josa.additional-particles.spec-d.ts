import { expectTypeOf } from 'vitest';
import { josa } from '@/index';

it('새 조사 쌍의 두 형태를 리터럴 타입으로 유지한다', () => {
  expectTypeOf(josa('학생', '이며/며')).toEqualTypeOf<'학생이며' | '학생며'>();
  expectTypeOf(josa.pick('학생', '이며/며')).toEqualTypeOf<'이며' | '며'>();
});
