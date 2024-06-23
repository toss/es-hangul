import { parseHangul } from './parseHangul';

describe('parseHangul 함수 테스트', () => {
  test('숫자와 알파벳 제거', () => {
    expect(parseHangul('안녕하세요1234abc!@#')).toBe('안녕하세요');
  });

  test('한글이 없는 문자열', () => {
    expect(parseHangul('1234abc')).toBe('');
  });

  test('한글과 공백만 남기고 다른 문자는 제거', () => {
    expect(parseHangul('한글과 영어가 섞인 문장입니다. Hello!')).toBe('한글과 영어가 섞인 문장입니다 ');
  });

  test('특수문자 제거', () => {
    expect(parseHangul('특수문자!@#가 들어간 경우')).toBe('특수문자가 들어간 경우');
  });

  test('숫자와 특수문자 제거', () => {
    expect(parseHangul('숫자1234와 특수문자!@# 제거')).toBe('숫자와 특수문자 제거');
  });

  test('공백 유지', () => {
    expect(parseHangul('공백도 유지됩니다    이렇게')).toBe('공백도 유지됩니다    이렇게');
  });

  test('모든 영어, 숫자, 특수문자를 제거', () => {
    expect(parseHangul('모든 영어와 숫자, 특수문자1234abc!@# 제거')).toBe('모든 영어와 숫자 특수문자 제거');
  });

  test('한글과 공백만 남기기', () => {
    expect(parseHangul('한글만 남습니다. 가나다라1234 마바사!@#')).toBe('한글만 남습니다 가나다라 마바사');
  });

  test('줄바꿈을 유지', () => {
    expect(parseHangul('한글과\n줄바꿈')).toBe('한글과\n줄바꿈');
  });

  test('탭과 공백을 유지', () => {
    expect(parseHangul('Tab\t과 공백')).toBe('\t과 공백');
  });
});
