import { getTypewriter, typing, TypingEventListener } from './typing';

describe('typeHangul', () => {
  it('"" -> "안녕하세요"', async () => {
    vi.useFakeTimers();
    const generator = typing('안녕하세요');
    const steps = [
      '',
      'ㅇ',
      '아',
      '안',
      '안ㄴ',
      '안녀',
      '안녕',
      '안녕ㅎ',
      '안녕하',
      '안녕핫',
      '안녕하세',
      '안녕하셍',
      '안녕하세요',
    ];

    const result = [];

    const next = generator.next();
    await vi.advanceTimersByTimeAsync(50);
    let iteration = await next;
    while (!iteration.done) {
      result.push(iteration.value);
      const next = generator.next();
      await vi.advanceTimersByTimeAsync(50);
      iteration = await next;
    }

    expect(result).toStrictEqual(steps);
  });

  it('"" -> "안녕하세요" (speed = 100)', async () => {
    vi.useFakeTimers();
    const generator = typing('안녕하세요', {
      speed: 100,
    });
    const steps = [
      '',
      'ㅇ',
      '아',
      '안',
      '안ㄴ',
      '안녀',
      '안녕',
      '안녕ㅎ',
      '안녕하',
      '안녕핫',
      '안녕하세',
      '안녕하셍',
      '안녕하세요',
    ];

    const result = [];

    const next = generator.next();
    await vi.advanceTimersByTimeAsync(100);
    let iteration = await next;
    while (!iteration.done) {
      result.push(iteration.value);
      const next = generator.next();
      await vi.advanceTimersByTimeAsync(100);
      iteration = await next;
    }

    expect(result).toStrictEqual(steps);
  });

  it('"안녕하세요" -> "안녕"', async () => {
    vi.useFakeTimers();
    const generator = typing('안녕', {
      initial: '안녕하세요',
    });

    const steps = ['안녕하세요', '안녕하셍', '안녕하세', '안녕핫', '안녕하', '안녕ㅎ', '안녕'];

    const result = [];

    const next = generator.next();
    await vi.advanceTimersByTimeAsync(50);
    let iteration = await next;
    while (!iteration.done) {
      result.push(iteration.value);
      const next = generator.next();
      await vi.advanceTimersByTimeAsync(50);
      iteration = await next;
    }

    expect(result).toStrictEqual(steps);
  });

  it('"안녕하세요" -> "안녕" (decomposeOnBackward = true)', async () => {
    vi.useFakeTimers();
    const generator = typing('안녕', {
      initial: '안녕하세요',
      decomposeOnBackward: true,
    });

    const steps = ['안녕하세요', '안녕하셍', '안녕하세', '안녕핫', '안녕하', '안녕ㅎ', '안녕'];

    const result = [];

    const next = generator.next();
    await vi.advanceTimersByTimeAsync(50);
    let iteration = await next;
    while (!iteration.done) {
      result.push(iteration.value);
      const next = generator.next();
      await vi.advanceTimersByTimeAsync(50);
      iteration = await next;
    }

    expect(result).toStrictEqual(steps);
  });

  it('"안녕하세요" -> "안녕" (decomposeOnBackward = false)', async () => {
    vi.useFakeTimers();
    const generator = typing('안녕', {
      initial: '안녕하세요',
      decomposeOnBackward: false,
    });

    const steps = ['안녕하세요', '안녕하세', '안녕하', '안녕'];

    const result = [];

    const next = generator.next();
    await vi.advanceTimersByTimeAsync(50);
    let iteration = await next;
    while (!iteration.done) {
      result.push(iteration.value);
      const next = generator.next();
      await vi.advanceTimersByTimeAsync(50);
      iteration = await next;
    }

    expect(result).toStrictEqual(steps);
  });

  it('"안녕하세요" -> ""', async () => {
    vi.useFakeTimers();
    const generator = typing('', {
      initial: '안녕하세요',
    });

    const steps = [
      '안녕하세요',
      '안녕하셍',
      '안녕하세',
      '안녕핫',
      '안녕하',
      '안녕ㅎ',
      '안녕',
      '안녀',
      '안ㄴ',
      '안',
      '아',
      'ㅇ',
      '',
    ];

    const result = [];

    const next = generator.next();
    await vi.advanceTimersByTimeAsync(50);
    let iteration = await next;
    while (!iteration.done) {
      result.push(iteration.value);
      const next = generator.next();
      await vi.advanceTimersByTimeAsync(50);
      iteration = await next;
    }

    expect(result).toStrictEqual(steps);
  });

  it(`초기값과 결과값이 같은 경우 에러를 반환한다. ("안녕하세요" -> "안녕하세요")`, async () => {
    vi.useFakeTimers();
    const generator = typing('안녕하세요', {
      initial: '안녕하세요',
    });

    await expect(() => generator.next()).rejects.toThrowError(
      `The initial value and the target are the same ('안녕하세요')`
    );
  });

  it(`타이핑 될 수 없는 조합의 초기값과 결과값이 입력 되는 경우 에러를 반환한다. ("하이" -> "안녕하세요")`, async () => {
    vi.useFakeTimers();
    const generator = typing('안녕하세요', {
      initial: '하이',
    });

    await expect(() => generator.next()).rejects.toThrowError(`'하이' can't be typed as '안녕하세요'`);
  });

  it(`타이핑 될 수 없는 조합의 초기값과 결과값이 입력 되는 경우 에러를 반환한다. ("안녕하세요" -> "하이")`, async () => {
    vi.useFakeTimers();
    const generator = typing('하이', {
      initial: '안녕하세요',
    });

    await expect(() => generator.next()).rejects.toThrowError(`'안녕하세요' can't be typed as '하이'`);
  });

  it(`백스페이스 타이핑이고, decomposeOnBackward = false일 때, target에 완전하지 않은 단어가 입력되면 에러를 반환한다. ("안녕하세요" -> "안녀")`, async () => {
    vi.useFakeTimers();
    const generator = typing('안녀', {
      initial: '안녕하세요',
      decomposeOnBackward: false,
    });

    await expect(() => generator.next()).rejects.toThrowError(
      `options.decomposeOnBackward' is set to false, but the last character of 'target'(안녀) is not a complete character for 'initial'(안녕하세요)`
    );
  });
});

describe('getTypewriterHangul', () => {
  it('"" -> "안녕하세요" -> "안녕" -> ""(decomposeOnBackward = true)', async () => {
    vi.useFakeTimers();
    const typewriter = getTypewriter();

    const steps = [
      '',
      'ㅇ',
      '아',
      '안',
      '안ㄴ',
      '안녀',
      '안녕',
      '안녕ㅎ',
      '안녕하',
      '안녕핫',
      '안녕하세',
      '안녕하셍',
      '안녕하세요',
    ].map(value => [value, { from: '', to: '안녕하세요', isReset: false }]);

    const result: Array<Parameters<TypingEventListener>> = [];

    typewriter.onType((...args) => {
      result.push(args);
    });

    typewriter.type('안녕하세요');

    await vi.advanceTimersByTimeAsync(50 * steps.length);

    expect(result).toStrictEqual(steps);

    const steps2 = ['안녕하세요', '안녕하셍', '안녕하세', '안녕핫', '안녕하', '안녕ㅎ', '안녕'].map(value => [
      value,
      { from: '안녕하세요', to: '안녕', isReset: false },
    ]);

    typewriter.type('안녕');

    await vi.advanceTimersByTimeAsync(50 * steps2.length);

    expect(result).toStrictEqual([...steps, ...steps2]);

    const steps3 = ['안녕', '안', ''].map(value => [value, { from: '안녕', to: '', isReset: false }]);

    typewriter.type('', {
      decomposeOnBackward: false,
    });

    await vi.advanceTimersByTimeAsync(50 * steps3.length);

    expect(result).toStrictEqual([...steps, ...steps2, ...steps3]);
  });

  it('reset 메소드를 실행하면 값이 즉시 변경되어야 한다. ("" -> "안녕하세요")', () => {
    vi.useFakeTimers();
    const typewriter = getTypewriter();

    const result: Array<Parameters<TypingEventListener>> = [];

    typewriter.onType((...args) => {
      result.push(args);
    });

    typewriter.reset('안녕하세요');

    expect(result).toStrictEqual([['안녕하세요', { from: '', to: '안녕하세요', isReset: true }]]);
  });

  it('onType 메소드가 반환하는 unsubscribe를 실행하면 타이핑 구독이 취소되어야 한다. ("" -> "안녕하세요" -> "안녕")', async () => {
    vi.useFakeTimers();
    const typewriter = getTypewriter();

    const steps = [
      '',
      'ㅇ',
      '아',
      '안',
      '안ㄴ',
      '안녀',
      '안녕',
      '안녕ㅎ',
      '안녕하',
      '안녕핫',
      '안녕하세',
      '안녕하셍',
      '안녕하세요',
    ].map(value => [value, { from: '', to: '안녕하세요', isReset: false }]);

    const result: Array<Parameters<TypingEventListener>> = [];

    const unsubscribe = typewriter.onType((...args) => {
      result.push(args);
    });

    typewriter.type('안녕하세요');

    await vi.advanceTimersByTimeAsync(50 * steps.length);

    unsubscribe();

    const steps2 = ['안녕하세요', '안녕하셍', '안녕하세', '안녕핫', '안녕하', '안녕ㅎ', '안녕'].map(value => [
      value,
      { from: '안녕하세요', to: '안녕', isReset: false },
    ]);

    typewriter.type('안녕');

    await vi.advanceTimersByTimeAsync(50 * steps2.length);

    expect(result).toStrictEqual(steps);
  });
});
