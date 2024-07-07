import { disassembleCompleteHangulCharacter } from '../../disassembleCompleteHangulCharacter';
import { defined } from '../../utils';
import { transform19th } from './transform19th';

describe('transform19th', () => {
  it('받침 "ㅁ, ㅇ" 뒤에 연결되는 "ㄹ"은 "ㄴ"으로 발음한다', () => {
    const current = defined(disassembleCompleteHangulCharacter('담'));
    const next = defined(disassembleCompleteHangulCharacter('력'));

    expect(transform19th(current, next)).toEqual({
      next: {
        first: 'ㄴ',
        middle: 'ㅕ',
        last: 'ㄱ',
      },
    });
  });

  it('받침 "ㄱ, ㅂ" 뒤에 연결되는 "ㄹ"도 "ㄴ"으로 발음한다', () => {
    const current = defined(disassembleCompleteHangulCharacter('막'));
    const next = defined(disassembleCompleteHangulCharacter('론'));

    expect(transform19th(current, next)).toEqual({
      next: {
        first: 'ㄴ',
        middle: 'ㅗ',
        last: 'ㄴ',
      },
    });
  });
});
