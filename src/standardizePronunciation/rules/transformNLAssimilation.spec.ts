import { disassembleCompleteHangulCharacter } from '../../disassembleCompleteHangulCharacter';
import { defined } from '../../utils';
import { transformNLAssimilation } from './transformNLAssimilation';

describe('transformNLAssimilation', () => {
  it('받침이 "ㄱ, ㄴ, ㄷ, ㅁ, ㅂ, ㅇ"이고 다음 음절이 "야, 여, 요, 유, 이, 얘, 예"로 이어지는 경우', () => {
    const current = defined(disassembleCompleteHangulCharacter('맨'));
    const next = defined(disassembleCompleteHangulCharacter('입'));

    expect(transformNLAssimilation(current, next)).toEqual({
      current: {
        first: 'ㅁ',
        middle: 'ㅐ',
        last: 'ㄴ',
      },
      next: {
        first: 'ㄴ',
        middle: 'ㅣ',
        last: 'ㅂ',
      },
    });
  });

  it('받침이 "ㄹ"이고 다음 음절이 "야, 여, 요, 유, 이, 얘, 예"로 이어지는 경우', () => {
    const current = defined(disassembleCompleteHangulCharacter('알'));
    const next = defined(disassembleCompleteHangulCharacter('약'));

    expect(transformNLAssimilation(current, next)).toEqual({
      current: {
        first: 'ㅇ',
        middle: 'ㅏ',
        last: 'ㄹ',
      },
      next: {
        first: 'ㄹ',
        middle: 'ㅑ',
        last: 'ㄱ',
      },
    });
  });

  it('ㄴ/ㄹ이 되기 위한 조건이지만 현재 음절의 중성의 ∙(아래아)가 하나가 아닐 경우에는 덧나지 않고 연음규칙이 적용된다', () => {
    const current = defined(disassembleCompleteHangulCharacter('양'));
    const next = defined(disassembleCompleteHangulCharacter('이'));

    expect(transformNLAssimilation(current, next)).toEqual({
      current: {
        first: 'ㅇ',
        middle: 'ㅑ',
        last: 'ㅇ',
      },
      next: {
        first: 'ㅇ',
        middle: 'ㅣ',
        last: '',
      },
    });
  });
});
