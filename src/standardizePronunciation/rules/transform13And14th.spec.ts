import { defined } from '../../_internal';
import { disassembleCompleteHangulCharacter } from '../../disassembleCompleteHangulCharacter';
import { transform13And14th } from './transform13And14th';

describe('transform13And14th', () => {
  it('13항을 적용합니다.', () => {
    const current = defined(disassembleCompleteHangulCharacter('깎'));
    const next = defined(disassembleCompleteHangulCharacter('아'));

    expect(transform13And14th(current, next)).toEqual({
      current: {
        choseong: 'ㄲ',
        jungseong: 'ㅏ',
        jongseong: '',
      },
      next: {
        choseong: 'ㄲ',
        jungseong: 'ㅏ',
        jongseong: '',
      },
    });
  });

  it('14항을 적용합니다.', () => {
    const current = defined(disassembleCompleteHangulCharacter('닭'));
    const next = defined(disassembleCompleteHangulCharacter('을'));

    expect(transform13And14th(current, next)).toEqual({
      current: {
        choseong: 'ㄷ',
        jungseong: 'ㅏ',
        jongseong: 'ㄹ',
      },
      next: {
        choseong: 'ㄱ',
        jungseong: 'ㅡ',
        jongseong: 'ㄹ',
      },
    });
  });
});