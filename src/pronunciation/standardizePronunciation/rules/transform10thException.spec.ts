import { defined } from '@/_internal';
import { disassembleCompleteCharacter } from '@/core/disassembleCompleteCharacter';
import { transform10thException } from './transform10thException';

describe('transform10thException', () => {
  it('"밟-"은 자음 앞에서 받침이 "ㅂ"이 된다', () => {
    const current = defined(disassembleCompleteCharacter('밟'));
    const next = defined(disassembleCompleteCharacter('다'));

    expect(transform10thException(current, next)).toEqual({
      current: {
        choseong: 'ㅂ',
        jungseong: 'ㅏ',
        jongseong: 'ㅂ',
      },
    });
  });

  it('"밟-"은 모음 앞에서는 적용하지 않는다', () => {
    const current = defined(disassembleCompleteCharacter('밟'));
    const next = defined(disassembleCompleteCharacter('아'));

    expect(transform10thException(current, next)).toEqual({
      current: {
        choseong: 'ㅂ',
        jungseong: 'ㅏ',
        jongseong: 'ㄹㅂ',
      },
    });
  });

  it('"넓-"은 "넓죽하다, 넓둥글다, 넓적하다"의 경우에 받침이 "ㅂ"이 된다', () => {
    const current = defined(disassembleCompleteCharacter('넓'));
    const next = defined(disassembleCompleteCharacter('죽'));

    expect(transform10thException(current, next)).toEqual({
      current: {
        choseong: 'ㄴ',
        jungseong: 'ㅓ',
        jongseong: 'ㅂ',
      },
    });
  });

  it('"넓-"은 그 외의 경우에는 적용하지 않는다', () => {
    const current = defined(disassembleCompleteCharacter('넓'));
    const next = defined(disassembleCompleteCharacter('게'));

    expect(transform10thException(current, next)).toEqual({
      current: {
        choseong: 'ㄴ',
        jungseong: 'ㅓ',
        jongseong: 'ㄹㅂ',
      },
    });
  });

  it('"밟", "넓"이 아닌 "ㄼ" 받침에는 적용하지 않는다', () => {
    const current = defined(disassembleCompleteCharacter('여'));
    const eight = defined(disassembleCompleteCharacter('덟'));
    const next = defined(disassembleCompleteCharacter('만'));

    expect(transform10thException(eight, next)).toEqual({
      current: {
        choseong: 'ㄷ',
        jungseong: 'ㅓ',
        jongseong: 'ㄹㅂ',
      },
    });
    expect(transform10thException(current, eight)).toEqual({
      current: {
        choseong: 'ㅇ',
        jungseong: 'ㅕ',
        jongseong: '',
      },
    });
  });
});
