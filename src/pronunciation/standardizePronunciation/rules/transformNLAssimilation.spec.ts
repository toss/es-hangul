import { defined } from '@/_internal';
import { disassembleCompleteCharacter } from '@/core/disassembleCompleteCharacter';
import { transformNLAssimilation } from './transformNLAssimilation';

describe('transformNLAssimilation', () => {
  it('받침이 "ㄱ, ㄴ, ㄷ, ㅁ, ㅂ, ㅇ"이고 다음 음절이 "야, 여, 요, 유, 이, 얘, 예"로 이어지는 경우', () => {
    const current = defined(disassembleCompleteCharacter('맨'));
    const next = defined(disassembleCompleteCharacter('입'));

    expect(transformNLAssimilation(current, next)).toEqual({
      current: {
        choseong: 'ㅁ',
        jungseong: 'ㅐ',
        jongseong: 'ㄴ',
      },
      next: {
        choseong: 'ㄴ',
        jungseong: 'ㅣ',
        jongseong: 'ㅂ',
      },
    });
  });

  it('받침이 "ㄹ"이고 다음 음절이 "야, 여, 요, 유, 이, 얘, 예"로 이어지는 경우', () => {
    const current = defined(disassembleCompleteCharacter('알'));
    const next = defined(disassembleCompleteCharacter('약'));

    expect(transformNLAssimilation(current, next)).toEqual({
      current: {
        choseong: 'ㅇ',
        jungseong: 'ㅏ',
        jongseong: 'ㄹ',
      },
      next: {
        choseong: 'ㄹ',
        jungseong: 'ㅑ',
        jongseong: 'ㄱ',
      },
    });
  });

  it('ㄴ/ㄹ이 되기 위한 조건이지만 현재 음절의 중성의 ∙(아래아)가 하나가 아닐 경우에는 덧나지 않고 연음규칙이 적용된다', () => {
    const current = defined(disassembleCompleteCharacter('양'));
    const next = defined(disassembleCompleteCharacter('이'));

    expect(transformNLAssimilation(current, next)).toEqual({
      current: {
        choseong: 'ㅇ',
        jungseong: 'ㅑ',
        jongseong: 'ㅇ',
      },
      next: {
        choseong: 'ㅇ',
        jungseong: 'ㅣ',
        jongseong: '',
      },
    });
  });
});
