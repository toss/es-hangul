import { defined } from '../../_internal';
import { disassembleCompleteCharacter } from '../../disassembleCompleteCharacter';
import { transform20th } from './transform20th';

describe('transform20th', () => {
  it('"ㄴ"은 "ㄹ"의 앞이나 뒤에서 "ㄹ"로 발음한다', () => {
    const current = defined(disassembleCompleteCharacter('난'));
    const next = defined(disassembleCompleteCharacter('로'));

    expect(transform20th(current, next)).toEqual({
      current: {
        first: 'ㄴ',
        middle: 'ㅏ',
        last: 'ㄹ',
      },
      next: {
        first: 'ㄹ',
        middle: 'ㅗ',
        last: '',
      },
    });
  });

  it('첫소리 "ㄴ"이 "ㅀ, ㄾ" 뒤에 연결되는 경우에도 "ㄹ"로 발음한다', () => {
    const current = defined(disassembleCompleteCharacter('닳'));
    const next = defined(disassembleCompleteCharacter('는'));

    expect(transform20th(current, next)).toEqual({
      current: {
        first: 'ㄷ',
        middle: 'ㅏ',
        last: 'ㄹㅎ',
      },
      next: {
        first: 'ㄹ',
        middle: 'ㅡ',
        last: 'ㄴ',
      },
    });
  });
});
