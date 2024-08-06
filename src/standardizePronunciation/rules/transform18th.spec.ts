import { defined } from '../../_internal';
import { disassembleCompleteCharacter } from '../../disassembleCompleteCharacter';
import { transform18th } from './transform18th';

describe('transform18th', () => {
  it('받침 "ㄱ, ㄲ, ㅋ, ㄳ, ㄺ"일 경우', () => {
    const current = defined(disassembleCompleteCharacter('먹'));
    const next = defined(disassembleCompleteCharacter('는'));

    expect(transform18th(current, next)).toEqual({
      current: {
        first: 'ㅁ',
        middle: 'ㅓ',
        last: 'ㅇ',
      },
    });
  });

  it('받침 "ㄷ, ㅅ, ㅆ, ㅈ, ㅊ, ㅌ, ㅎ"일 경우', () => {
    const current = defined(disassembleCompleteCharacter('닫'));
    const next = defined(disassembleCompleteCharacter('는'));

    expect(transform18th(current, next)).toEqual({
      current: {
        first: 'ㄷ',
        middle: 'ㅏ',
        last: 'ㄴ',
      },
    });
  });

  it('받침 "ㅂ, ㅍ, ㄼ, ㄿ, ㅄ"일 경우', () => {
    const current = defined(disassembleCompleteCharacter('잡'));
    const next = defined(disassembleCompleteCharacter('는'));

    expect(transform18th(current, next)).toEqual({
      current: {
        first: 'ㅈ',
        middle: 'ㅏ',
        last: 'ㅁ',
      },
    });
  });
});
