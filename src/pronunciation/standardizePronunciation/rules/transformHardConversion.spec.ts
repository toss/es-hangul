import { defined } from '@/_internal';
import { disassembleCompleteCharacter } from '@/core/disassembleCompleteCharacter';
import { transformHardConversion } from './transformHardConversion';

describe('transformHardConversion', () => {
  it('23항 - 받침 "ㄱ(ㄲ, ㅋ, ㄳ, ㄺ), ㄷ(ㅅ, ㅆ, ㅈ, ㅊ, ㅌ), ㅂ(ㅍ, ㄼ, ㄿ, ㅄ)" 뒤에 연결되는 "ㄱ, ㄷ, ㅂ, ㅅ, ㅈ"은 된소리로 발음한다', () => {
    const current = defined(disassembleCompleteCharacter('국'));
    const next = defined(disassembleCompleteCharacter('밥'));

    expect(transformHardConversion(current, next)).toEqual({
      next: {
        choseong: 'ㅃ',
        jungseong: 'ㅏ',
        jongseong: 'ㅂ',
      },
    });
  });

  it('24항 - 어간 받침 "ㄴ(ㄵ), ㅁ(ㄻ)" 뒤에 결합되는 어미의 첫소리 "ㄱ, ㄷ, ㅅ, ㅈ"은 된소리로 발음한다', () => {
    const current = defined(disassembleCompleteCharacter('신'));
    const next = defined(disassembleCompleteCharacter('고'));

    expect(transformHardConversion(current, next)).toEqual({
      next: {
        choseong: 'ㄲ',
        jungseong: 'ㅗ',
        jongseong: '',
      },
    });
  });

  it('25항 - 어간 받침 "ㄼ, ㄾ" 뒤에 결합되는 어미의 첫소리 "ㄱ, ㄷ, ㅅ, ㅈ"은 된소리로 발음한다', () => {
    const current = defined(disassembleCompleteCharacter('넓'));
    const next = defined(disassembleCompleteCharacter('게'));

    expect(transformHardConversion(current, next)).toEqual({
      next: {
        choseong: 'ㄲ',
        jungseong: 'ㅔ',
        jongseong: '',
      },
    });
  });

  it('예외사항 - 현재 음절이 경음화를 적용할 수 있는 받침에 해당하지만, 다음 음절의 받침이 "자음군 단순화" 음운현상이 생긴다면 된소리로 발음하지 않는다', () => {
    const current = defined(disassembleCompleteCharacter('힘'));
    const next = defined(disassembleCompleteCharacter('듦'));

    expect(transformHardConversion(current, next)).toEqual({
      next: {
        choseong: 'ㄷ',
        jungseong: 'ㅡ',
        jongseong: 'ㄹㅁ',
      },
    });
  });

  it('번외 - 현재 음절의 받침이 "자음군 단순화" 대상에 해당하지만, 다음 음절의 초성이 "음가가 없는 자음"일 경우에는 된소리로 발음하지 않는다', () => {
    const current = defined(disassembleCompleteCharacter('삶'));
    const next = defined(disassembleCompleteCharacter('은'));

    expect(transformHardConversion(current, next)).toEqual({
      next: {
        choseong: 'ㅇ',
        jungseong: 'ㅡ',
        jongseong: 'ㄴ',
      },
    });
  });
});
