import { defined } from '@/_internal';
import { disassembleCompleteCharacter } from '@/core/disassembleCompleteCharacter';
import { transform12th } from './transform12th';

describe('transform12th', () => {
  it('"ㅎ, ㄶ, ㅀ" 뒤에 "ㄱ, ㄷ, ㅈ"이 결합되는 경우에는, 뒤 음절 첫소리와 합쳐서 "ㅋ, ㅌ, ㅊ"으로 발음한다', () => {
    const current = defined(disassembleCompleteCharacter('놓'));
    const next = defined(disassembleCompleteCharacter('고'));

    expect(transform12th(current, next)).toEqual({
      current: {
        choseong: 'ㄴ',
        jungseong: 'ㅗ',
        jongseong: '',
      },
      next: {
        choseong: 'ㅋ',
        jungseong: 'ㅗ',
        jongseong: '',
      },
    });
  });

  it('받침 "ㄱ, ㄺ, ㄷ, ㅂ, ㄼ, ㅈ, ㄵ"이 뒤 음절 첫소리 "ㅎ"과 결합되는 경우에도, 역시 두 음을 합쳐서 "ㅋ, ㅌ, ㅍ, ㅊ"으로 발음한다', () => {
    const current = defined(disassembleCompleteCharacter('각'));
    const next = defined(disassembleCompleteCharacter('하'));

    expect(transform12th(current, next)).toEqual({
      current: {
        choseong: 'ㄱ',
        jungseong: 'ㅏ',
        jongseong: '',
      },
      next: {
        choseong: 'ㅋ',
        jungseong: 'ㅏ',
        jongseong: '',
      },
    });
  });

  it('[붙임 2] "ㄷ"으로 발음되는 받침 "ㅅ, ㅆ, ㅊ, ㅌ"이 첫소리 "ㅎ"과 결합되는 경우에는, 합쳐서 "ㅌ"으로 발음한다', () => {
    // 숱 + 하 -> 수 + 타
    expect(transform12th(defined(disassembleCompleteCharacter('숱')), defined(disassembleCompleteCharacter('하')))).toEqual({
      current: { choseong: 'ㅅ', jungseong: 'ㅜ', jongseong: '' },
      next: { choseong: 'ㅌ', jungseong: 'ㅏ', jongseong: '' },
    });
    // 옷 + 한 -> 오 + 탄
    expect(transform12th(defined(disassembleCompleteCharacter('옷')), defined(disassembleCompleteCharacter('한')))).toEqual({
      current: { choseong: 'ㅇ', jungseong: 'ㅗ', jongseong: '' },
      next: { choseong: 'ㅌ', jungseong: 'ㅏ', jongseong: 'ㄴ' },
    });
    // 꽃 + 한 -> 꼬 + 탄
    expect(transform12th(defined(disassembleCompleteCharacter('꽃')), defined(disassembleCompleteCharacter('한')))).toEqual({
      current: { choseong: 'ㄲ', jungseong: 'ㅗ', jongseong: '' },
      next: { choseong: 'ㅌ', jungseong: 'ㅏ', jongseong: 'ㄴ' },
    });
    // 있 + 히 -> 이 + 티 (받침 ㅆ)
    expect(transform12th(defined(disassembleCompleteCharacter('있')), defined(disassembleCompleteCharacter('히')))).toEqual({
      current: { choseong: 'ㅇ', jungseong: 'ㅣ', jongseong: '' },
      next: { choseong: 'ㅌ', jungseong: 'ㅣ', jongseong: '' },
    });
  });

  it('[붙임 2]의 대상이 아닌 받침 "ㅈ"은 [붙임 1] 규칙에 따라 "ㅊ"으로 발음한다', () => {
    // 맞 + 히 -> 마 + 치 (ㅈ은 ㅌ이 아닌 ㅊ)
    expect(transform12th(defined(disassembleCompleteCharacter('맞')), defined(disassembleCompleteCharacter('히')))).toEqual({
      current: { choseong: 'ㅁ', jungseong: 'ㅏ', jongseong: '' },
      next: { choseong: 'ㅊ', jungseong: 'ㅣ', jongseong: '' },
    });
  });

  it('"ㅎ, ㄶ, ㅀ" 뒤에 "ㅅ"이 결합되는 경우에는, "ㅅ"을 "ㅆ"으로 발음한다', () => {
    const current = defined(disassembleCompleteCharacter('닿'));
    const next = defined(disassembleCompleteCharacter('소'));

    expect(transform12th(current, next)).toEqual({
      current: {
        choseong: 'ㄷ',
        jungseong: 'ㅏ',
        jongseong: '',
      },
      next: {
        choseong: 'ㅆ',
        jungseong: 'ㅗ',
        jongseong: '',
      },
    });
  });

  it('"ㅎ" 뒤에 "ㄴ"이 결합되는 경우에는 "ㄴ"으로 발음한다', () => {
    const current = defined(disassembleCompleteCharacter('놓'));
    const next = defined(disassembleCompleteCharacter('는'));

    expect(transform12th(current, next)).toEqual({
      current: {
        choseong: 'ㄴ',
        jungseong: 'ㅗ',
        jongseong: '',
      },
      next: {
        choseong: 'ㄴ',
        jungseong: 'ㅡ',
        jongseong: 'ㄴ',
      },
    });
  });

  it('"ㄶ, ㅀ" 뒤에 "ㄴ"이 결합되는 경우에는, "ㅎ"을 발음하지 않는다', () => {
    const current = defined(disassembleCompleteCharacter('않'));
    const next = defined(disassembleCompleteCharacter('네'));

    expect(transform12th(current, next)).toEqual({
      current: {
        choseong: 'ㅇ',
        jungseong: 'ㅏ',
        jongseong: 'ㄴ',
      },
      next: {
        choseong: 'ㄴ',
        jungseong: 'ㅔ',
        jongseong: '',
      },
    });
  });

  it('"ㅎ, ㄶ, ㅀ" 뒤에 모음으로 시작된 어미나 접미사가 결합되는 경우에는 "ㅎ"을 발음하지 않는다', () => {
    const current = defined(disassembleCompleteCharacter('낳'));
    const next = defined(disassembleCompleteCharacter('은'));

    expect(transform12th(current, next)).toEqual({
      current: {
        choseong: 'ㄴ',
        jungseong: 'ㅏ',
        jongseong: '',
      },
      next: {
        choseong: 'ㅇ',
        jungseong: 'ㅡ',
        jongseong: 'ㄴ',
      },
    });
  });

  it('"ㅎ, ㄶ, ㅀ" 뒤에 모음으로 시작된 어미나 접미사가 결합되는 경우에는 "ㅎ"을 발음하지 않는다', () => {
    const current = defined(disassembleCompleteCharacter('많'));
    const next = null;

    expect(transform12th(current, next)).toEqual({
      current: {
        choseong: 'ㅁ',
        jungseong: 'ㅏ',
        jongseong: 'ㄴ',
      },
      next: null,
    });
  });
});
