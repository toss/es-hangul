import { defined } from '@/_internal';
import { disassembleCompleteCharacter } from '@/core/disassembleCompleteCharacter';
import { transform17th } from './transform17th';

describe('transform17th', () => {
  it('받침 "ㄷ", "ㅌ(ㄾ)"이 조사나 접미사의 모음 "ㅣ"와 결합되는 경우에는, "ㅈ", "ㅊ"으로 바꾸어서 뒤 음절 첫소리로 옮겨 발음한다', () => {
    const current = defined(disassembleCompleteCharacter('굳'));
    const next = defined(disassembleCompleteCharacter('이'));

    expect(transform17th(current, next)).toEqual({
      current: {
        choseong: 'ㄱ',
        jungseong: 'ㅜ',
        jongseong: '',
      },
      next: {
        choseong: 'ㅈ',
        jungseong: 'ㅣ',
        jongseong: '',
      },
    });
  });

  it('"ㄷ" 뒤에 접미사 "히"가 결합되어 "티"를 이루는 것은 "치"로 발음한다', () => {
    const current = defined(disassembleCompleteCharacter('굳'));
    const next = defined(disassembleCompleteCharacter('히'));

    expect(transform17th(current, next)).toEqual({
      current: {
        choseong: 'ㄱ',
        jungseong: 'ㅜ',
        jongseong: '',
      },
      next: {
        choseong: 'ㅊ',
        jungseong: 'ㅣ',
        jongseong: '',
      },
    });
  });
});
