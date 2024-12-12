import { combineCharacter } from './combineCharacter';

describe('combineCharacter', () => {
  it('종성으로 겹받침으로 구성될 수 있는 문자 두 개를 받으면 겹받침을 생성한다. (ㄱ, ㅏ, ㅂㅅ)', () => {
    expect(combineCharacter('ㄱ', 'ㅏ', 'ㅂㅅ')).toEqual('값');
  });

  it('종성이 입력되지 않았다면 받침이 없는 문자로 합성한다. (ㅌ, ㅗ)', () => {
    expect(combineCharacter('ㅌ', 'ㅗ')).toEqual('토');
  });

  it('종성이 입력되었다면 받침을 추가한다. (ㅌ, ㅗ, ㅅ)', () => {
    expect(combineCharacter('ㅌ', 'ㅗ', 'ㅅ')).toEqual('톳');
  });

  it('초성이 될 수 없는 문자가 초성으로 입력되면 에러를 반환한다. (ㅏ, ㅏ, ㄱ)', () => {
    expect(() => combineCharacter('ㅏ', 'ㅏ', 'ㄱ')).toThrowError('Invalid hangul Characters: ㅏ, ㅏ, ㄱ');
  });

  it('중성이 될 수 없는 문자가 중성으로 입력되면 에러를 반환한다. (ㄱ, ㄴ, ㅃ)', () => {
    expect(() => combineCharacter('ㄱ', 'ㄴ', 'ㅃ')).toThrowError('Invalid hangul Characters: ㄱ, ㄴ, ㅃ');
  });

  it('종성이 될 수 없는 문자가 종성으로 입력되면 에러를 반환한다. (ㄱ, ㅏ, ㅃ)', () => {
    expect(() => combineCharacter('ㄱ', 'ㅏ', 'ㅃ')).toThrowError('Invalid hangul Characters: ㄱ, ㅏ, ㅃ');
  });

  it('온전한 한글 문자가 하나라도 입력되면 에러를 반환한다. (가, ㅏ, ㄱ)', () => {
    expect(() => combineCharacter('가', 'ㅏ', 'ㄱ')).toThrowError('Invalid hangul Characters: 가, ㅏ, ㄱ');
  });
});
