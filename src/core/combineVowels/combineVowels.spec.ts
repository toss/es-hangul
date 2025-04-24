import { combineVowels } from './combineVowels';

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
