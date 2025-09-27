import { seosusa } from './seosusa';
import * as numberToHangulModule from '@/number/numberToHangul';

describe('seosusa', () => {
  const validNumbers = [
    { num: 1, word: '첫째' },
    { num: 2, word: '둘째' },
    { num: 3, word: '셋째' }, // '셋째'가 표준어이고 '세째'는 비표준어이다.(표준어 사정 원칙 제6항)
    { num: 4, word: '넷째' }, // '넷째'가 표준어이고 '네째'는 비표준어이다.(표준어 사정 원칙 제6항)
    { num: 5, word: '다섯째' },
    { num: 6, word: '여섯째' },
    { num: 7, word: '일곱째' },
    { num: 8, word: '여덟째' },
    { num: 9, word: '아홉째' },
    { num: 10, word: '열째' },
    { num: 11, word: '열한째' },
    { num: 12, word: '열두째' }, // '둘째'는 십 단위 이상의 서수사에 쓰일 때에 '두째'로 한다.(표준어 사정 원칙 제6항)
    { num: 13, word: '열셋째' },
    { num: 14, word: '열넷째' },
    { num: 15, word: '열다섯째' },
    { num: 20, word: '스무째' },
    { num: 21, word: '스물한째' },
    { num: 22, word: '스물두째' },
    { num: 30, word: '서른째' },
    { num: 40, word: '마흔째' },
    { num: 90, word: '아흔째' },
    { num: 99, word: '아흔아홉째' },
    { num: 100, word: '백째' },
    { num: 101, word: '백일째' },
  ];

  const invalidNumbers = [0, -1, 1.1, -1.1, Infinity, -Infinity, NaN];

  validNumbers.forEach(({ num, word }) => {
    it(`${num} - 순 우리말 서수사로 변환한다.`, () => {
      expect(seosusa(num)).toBe(word);
    });
  });

  invalidNumbers.forEach(num => {
    it(`${num} - 유효하지 않은 숫자에 대해 오류를 발생시켜야 한다.`, () => {
      expect(() => seosusa(num)).toThrow('유효하지 않은 입력입니다. 1이상의 정수만 지원합니다.');
    });
  });

  describe('에러 처리', () => {
    it('numberToHangul에서 에러가 발생하면 적절한 에러 메시지를 반환한다', () => {
      const mockNumberToHangul = vi.spyOn(numberToHangulModule, 'numberToHangul');
      mockNumberToHangul.mockImplementation(() => {
        throw new Error('Mock error from numberToHangul');
      });

      expect(() => seosusa(100)).toThrow('유효하지 않은 입력입니다. 1이상의 정수만 지원합니다.');

      mockNumberToHangul.mockRestore();
    });
  });
});
