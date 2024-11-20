import { fakerKO as faker } from '@faker-js/faker';

import { josa as autoJosa } from 'auto-josa';
import { josa as esHangulJosa } from 'es-hangul';
import { josa } from 'josa';
import { bench, describe } from 'vitest';

const name = faker.person.firstName();

describe('하나의 조사', () => {
  bench('es-hangul', () => {
    esHangulJosa(name, '이/가');
  });

  bench('auto-josa', () => {
    autoJosa`${name}이`;
  });

  bench('josa', () => {
    josa(`${name}#{이}`);
  });
});

const city = faker.location.city();
const street = faker.location.street();
const noun = faker.word.noun();

describe(`네개의 조사 ${name}이/가 ${noun}을/를 ${city}은/는 ${street}와/과`, () => {
  bench('es-hangul', () => {
    esHangulJosa(noun, '이/가');
    esHangulJosa(name, '을/를');
    esHangulJosa(city, '은/는');
    esHangulJosa(street, '와/과');
  });

  bench('auto-josa', () => {
    autoJosa`${noun}이`;
    autoJosa`${name}을`;
    autoJosa`${city}은`;
    autoJosa`${street}와`;
  });

  bench('josa', () => {
    josa(`${noun}#{이}`);
    josa(`${name}#{을}`);
    josa(`${city}#{은}`);
    josa(`${street}#{와}`);
  });
});
