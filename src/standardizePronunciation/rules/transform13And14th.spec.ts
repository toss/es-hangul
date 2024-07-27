import { defined } from '../../_internal';
import { disassembleCompleteHangulCharacter } from '../../disassembleCompleteHangulCharacter';
import { transform13And14th } from './transform13And14th';

describe('transform13And14th', () => {
  it('13항을 적용합니다.', () => {
    const current = defined(disassembleCompleteHangulCharacter('깎'));
    const next = defined(disassembleCompleteHangulCharacter('아'));

    expect(transform13And14th(current, next)).toEqual({
      current: {
        first: 'ㄲ',
        middle: 'ㅏ',
        last: '',
      },
      next: {
        first: 'ㄲ',
        middle: 'ㅏ',
        last: '',
      },
    });
  });

  it('14항을 적용합니다.', () => {
    const current = defined(disassembleCompleteHangulCharacter('닭'));
    const next = defined(disassembleCompleteHangulCharacter('을'));

    expect(transform13And14th(current, next)).toEqual({
      current: {
        first: 'ㄷ',
        middle: 'ㅏ',
        last: 'ㄹ',
      },
      next: {
        first: 'ㄱ',
        middle: 'ㅡ',
        last: 'ㄹ',
      },
    });
  });
});
