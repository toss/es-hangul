import { disassembleCompleteHangulCharacter } from '../../disassembleCompleteHangulCharacter';
import { defined } from '../../utils';
import { transform12th } from './transform12th';

describe('transform12th', () => {
  it('"ㅎ, ㄶ, ㅀ" 뒤에 "ㄱ, ㄷ, ㅈ"이 결합되는 경우에는, 뒤 음절 첫소리와 합쳐서 "ㅋ, ㅌ, ㅊ"으로 발음한다', () => {
    const current = defined(disassembleCompleteHangulCharacter('놓'));
    const next = defined(disassembleCompleteHangulCharacter('고'));

    expect(transform12th(current, next)).toEqual({
      current: {
        first: 'ㄴ',
        middle: 'ㅗ',
        last: '',
      },
      next: {
        first: 'ㅋ',
        middle: 'ㅗ',
        last: '',
      },
    });
  });

  it('받침 "ㄱ, ㄺ, ㄷ, ㅂ, ㄼ, ㅈ, ㄵ"이 뒤 음절 첫소리 "ㅎ"과 결합되는 경우에도, 역시 두 음을 합쳐서 "ㅋ, ㅌ, ㅍ, ㅊ"으로 발음한다', () => {
    const current = defined(disassembleCompleteHangulCharacter('각'));
    const next = defined(disassembleCompleteHangulCharacter('하'));

    expect(transform12th(current, next)).toEqual({
      current: {
        first: 'ㄱ',
        middle: 'ㅏ',
        last: '',
      },
      next: {
        first: 'ㅋ',
        middle: 'ㅏ',
        last: '',
      },
    });
  });

  it('"ㅎ, ㄶ, ㅀ" 뒤에 "ㅅ"이 결합되는 경우에는, "ㅅ"을 "ㅆ"으로 발음한다', () => {
    const current = defined(disassembleCompleteHangulCharacter('닿'));
    const next = defined(disassembleCompleteHangulCharacter('소'));

    expect(transform12th(current, next)).toEqual({
      current: {
        first: 'ㄷ',
        middle: 'ㅏ',
        last: '',
      },
      next: {
        first: 'ㅆ',
        middle: 'ㅗ',
        last: '',
      },
    });
  });

  it('"ㅎ" 뒤에 "ㄴ"이 결합되는 경우에는 "ㄴ"으로 발음한다', () => {
    const current = defined(disassembleCompleteHangulCharacter('놓'));
    const next = defined(disassembleCompleteHangulCharacter('는'));

    expect(transform12th(current, next)).toEqual({
      current: {
        first: 'ㄴ',
        middle: 'ㅗ',
        last: '',
      },
      next: {
        first: 'ㄴ',
        middle: 'ㅡ',
        last: 'ㄴ',
      },
    });
  });

  it('"ㄶ, ㅀ" 뒤에 "ㄴ"이 결합되는 경우에는, "ㅎ"을 발음하지 않는다', () => {
    const current = defined(disassembleCompleteHangulCharacter('않'));
    const next = defined(disassembleCompleteHangulCharacter('네'));

    expect(transform12th(current, next)).toEqual({
      current: {
        first: 'ㅇ',
        middle: 'ㅏ',
        last: 'ㄴ',
      },
      next: {
        first: 'ㄴ',
        middle: 'ㅔ',
        last: '',
      },
    });
  });

  it('"ㅎ, ㄶ, ㅀ" 뒤에 모음으로 시작된 어미나 접미사가 결합되는 경우에는 "ㅎ"을 발음하지 않는다', () => {
    const current = defined(disassembleCompleteHangulCharacter('낳'));
    const next = defined(disassembleCompleteHangulCharacter('은'));

    expect(transform12th(current, next)).toEqual({
      current: {
        first: 'ㄴ',
        middle: 'ㅏ',
        last: '',
      },
      next: {
        first: 'ㅇ',
        middle: 'ㅡ',
        last: 'ㄴ',
      },
    });
  });

  it('"ㅎ, ㄶ, ㅀ" 뒤에 모음으로 시작된 어미나 접미사가 결합되는 경우에는 "ㅎ"을 발음하지 않는다', () => {
    const current = defined(disassembleCompleteHangulCharacter('많'));
    const next = null;

    expect(transform12th(current, next)).toEqual({
      current: {
        first: 'ㅁ',
        middle: 'ㅏ',
        last: 'ㄴ',
      },
      next: null,
    });
  });
});
