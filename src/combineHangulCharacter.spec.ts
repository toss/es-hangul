import { describe, it, expect, assert } from 'vitest';
import { combineHangulCharacter, combineVowels } from './combineHangulCharacter';

describe('combineHangulCharacter', () => {
  it('종성으로 겹받침으로 구성될 수 있는 문자 두 개를 받으면 겹받침을 생성한다. (ㄱ, ㅏ, ㅂㅅ)', () => {
    expect(combineHangulCharacter('ㄱ', 'ㅏ', 'ㅂㅅ')).toEqual('값');
  });

  it('종성이 입력되지 않았다면 받침이 없는 문자로 합성한다. (ㅌ, ㅗ)', () => {
    expect(combineHangulCharacter('ㅌ', 'ㅗ')).toEqual('토');
  });

  it('종성이 입력되었다면 받침을 추가한다. (ㅌ, ㅗ, ㅅ)', () => {
    expect(combineHangulCharacter('ㅌ', 'ㅗ', 'ㅅ')).toEqual('톳');
  });

  it('초성이 될 수 없는 문자가 초성으로 입력되면 에러를 반환한다. (ㅏ, ㅏ, ㄱ)', () => {
    assert.throws(() => combineHangulCharacter('ㅏ', 'ㅏ', 'ㄱ'), Error, 'Invalid hangul Characters: ㅏ, ㅏ, ㄱ');
  });

  it('중성이 될 수 없는 문자가 중성으로 입력되면 에러를 반환한다. (ㄱ, ㄴ, ㅃ)', () => {
    assert.throws(() => combineHangulCharacter('ㄱ', 'ㄴ', 'ㅃ'), Error, 'Invalid hangul Characters: ㄱ, ㄴ, ㅃ');
  });

  it('종성이 될 수 없는 문자가 종성으로 입력되면 에러를 반환한다. (ㄱ, ㅏ, ㅃ)', () => {
    assert.throws(() => combineHangulCharacter('ㄱ', 'ㅏ', 'ㅃ'), Error, 'Invalid hangul Characters: ㄱ, ㅏ, ㅃ');
  });

  it('온전한 한글 문자가 하나라도 입력되면 에러를 반환한다. (가, ㅏ, ㄱ)', () => {
    assert.throws(() => combineHangulCharacter('가', 'ㅏ', 'ㄱ'), Error, 'Invalid hangul Characters: 가, ㅏ, ㄱ');
  });
});

describe('combineVowels', () => {
  it('겹모음이 될 수 있는 모음이 순서대로 입력되면 겹모음으로 합성한다.', () => {
    expect(combineVowels('ㅗ', 'ㅏ')).toBe('ㅘ');
    expect(combineVowels('ㅜ', 'ㅔ')).toBe('ㅞ');
    expect(combineVowels('ㅡ', 'ㅣ')).toBe('ㅢ');
  });
  it('겹모음이 될 수 있는 모음이라고 해도 틀린 순서로 입력되면 Join한다.', () => {
    expect(combineVowels('ㅏ', 'ㅗ')).toBe('ㅏㅗ');
    expect(combineVowels('ㅣ', 'ㅡ')).toBe('ㅣㅡ');
  });
  it('이미 겹모음인 문자와 모음을 합성하려고 시도하면 Join한다.', () => {
    expect(combineVowels('ㅘ', 'ㅏ')).toBe('ㅘㅏ');
    expect(combineVowels('ㅝ', 'ㅣ')).toBe('ㅝㅣ');
  });
});
