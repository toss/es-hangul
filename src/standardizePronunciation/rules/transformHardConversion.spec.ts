import { defined } from '../../_internal';
import { disassembleCompleteHangulCharacter } from '../../disassembleCompleteHangulCharacter';
import { transformHardConversion } from './transformHardConversion';

describe('transformHardConversion', () => {
  it('23항 - 받침 "ㄱ(ㄲ, ㅋ, ㄳ, ㄺ), ㄷ(ㅅ, ㅆ, ㅈ, ㅊ, ㅌ), ㅂ(ㅍ, ㄼ, ㄿ, ㅄ)" 뒤에 연결되는 "ㄱ, ㄷ, ㅂ, ㅅ, ㅈ"은 된소리로 발음한다', () => {
    const current = defined(disassembleCompleteHangulCharacter('국'));
    const next = defined(disassembleCompleteHangulCharacter('밥'));

    expect(transformHardConversion(current, next)).toEqual({
      next: {
        first: 'ㅃ',
        middle: 'ㅏ',
        last: 'ㅂ',
      },
    });
  });

  it('24항 - 어간 받침 "ㄴ(ㄵ), ㅁ(ㄻ)" 뒤에 결합되는 어미의 첫소리 "ㄱ, ㄷ, ㅅ, ㅈ"은 된소리로 발음한다', () => {
    const current = defined(disassembleCompleteHangulCharacter('신'));
    const next = defined(disassembleCompleteHangulCharacter('고'));

    expect(transformHardConversion(current, next)).toEqual({
      next: {
        first: 'ㄲ',
        middle: 'ㅗ',
        last: '',
      },
    });
  });

  it('25항 - 어간 받침 "ㄼ, ㄾ" 뒤에 결합되는 어미의 첫소리 "ㄱ, ㄷ, ㅅ, ㅈ"은 된소리로 발음한다', () => {
    const current = defined(disassembleCompleteHangulCharacter('넓'));
    const next = defined(disassembleCompleteHangulCharacter('게'));

    expect(transformHardConversion(current, next)).toEqual({
      next: {
        first: 'ㄲ',
        middle: 'ㅔ',
        last: '',
      },
    });
  });
});
