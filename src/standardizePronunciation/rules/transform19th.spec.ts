import { defined } from '../../_internal';
import { disassembleCompleteHangulCharacter } from '../../disassembleCompleteHangulCharacter';
import { transform19th } from './transform19th';

describe('transform19th', () => {
  it('받침 "ㅁ, ㅇ" 뒤에 연결되는 "ㄹ"은 "ㄴ"으로 발음한다', () => {
    const current = defined(disassembleCompleteHangulCharacter('담'));
    const next = defined(disassembleCompleteHangulCharacter('력'));

    expect(transform19th(current, next)).toEqual({
      next: {
        choseong: 'ㄴ',
        jungseong: 'ㅕ',
        jongseong: 'ㄱ',
      },
    });
  });

  it('받침 "ㄱ, ㅂ" 뒤에 연결되는 "ㄹ"도 "ㄴ"으로 발음한다', () => {
    const current = defined(disassembleCompleteHangulCharacter('막'));
    const next = defined(disassembleCompleteHangulCharacter('론'));

    expect(transform19th(current, next)).toEqual({
      next: {
        choseong: 'ㄴ',
        jungseong: 'ㅗ',
        jongseong: 'ㄴ',
      },
    });
  });
});
