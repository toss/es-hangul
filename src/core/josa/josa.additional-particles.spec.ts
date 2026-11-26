import { josa } from './josa';

describe('추가 조사', () => {
  it('이며/며', () => {
    expect(josa('학생', '이며/며')).toBe('학생이며');
    expect(josa('의사', '이며/며')).toBe('의사며');
    expect(josa.pick('학생', '이며/며')).toBe('이며');
    expect(josa.pick('의사', '이며/며')).toBe('며');
  });

  it('이라서/라서', () => {
    expect(josa('학생', '이라서/라서')).toBe('학생이라서');
    expect(josa('의사', '이라서/라서')).toBe('의사라서');
    expect(josa.pick('학생', '이라서/라서')).toBe('이라서');
    expect(josa.pick('의사', '이라서/라서')).toBe('라서');
  });

  it('이야말로/야말로', () => {
    expect(josa('학생', '이야말로/야말로')).toBe('학생이야말로');
    expect(josa('의사', '이야말로/야말로')).toBe('의사야말로');
    expect(josa.pick('학생', '이야말로/야말로')).toBe('이야말로');
    expect(josa.pick('의사', '이야말로/야말로')).toBe('야말로');
  });
});
