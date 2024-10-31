import { fakerKO as faker } from '@faker-js/faker';

import { josa as autoJosa } from 'auto-josa';
import { josa as esHangulJosa } from 'es-hangul';
import { josa } from 'josa';
import { ko } from 'k-popo';
import { bench, describe } from 'vitest';

describe('하나의 조사', () => {
  const name = faker.person.firstName();

  bench('es-hangul', () => {
    esHangulJosa(name, '이/가');
  });

  bench('auto-josa', () => {
    autoJosa`${name}이`;
  });

  bench('josa', () => {
    josa(`${name}#{이}`);
  });

  bench('k-popo', () => {
    ko`${name}(이)가`;
  });
});
