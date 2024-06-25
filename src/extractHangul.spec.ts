import { extractHangul } from './extractHangul';

describe('extractHangul 함수 테스트', () => {
  it('숫자와 알파벳 추출', () => {
    expect(extractHangul('안녕하세요1234abc!@#')).toBe('안녕하세요');
  });

  it('한글이 없는 문자열', () => {
    expect(extractHangul('1234abc')).toBe('');
  });

  it('한글과 공백만 남기고 다른 문자는 추출', () => {
    expect(extractHangul('한글과 영어가 섞인 문장입니다. Hello!')).toBe('한글과 영어가 섞인 문장입니다 ');
  });

  it('특수문자 추출', () => {
    expect(extractHangul('특수문자!@#가 들어간 경우')).toBe('특수문자가 들어간 경우');
  });

  it('숫자와 특수문자 추출', () => {
    expect(extractHangul('숫자1234와 특수문자!@# 추출')).toBe('숫자와 특수문자 추출');
  });

  it('공백 유지', () => {
    expect(extractHangul('공백도 유지됩니다    이렇게')).toBe('공백도 유지됩니다    이렇게');
  });

  it('모든 영어, 숫자, 특수문자 추출', () => {
    expect(extractHangul('모든 영어와 숫자, 특수문자1234abc!@# 추출')).toBe('모든 영어와 숫자 특수문자 추출');
  });

  it('한글과 공백만 남기기', () => {
    expect(extractHangul('한글만 남습니다. 가나다라1234 마바사!@#')).toBe('한글만 남습니다 가나다라 마바사');
  });

  it('줄바꿈 유지', () => {
    expect(extractHangul('한글과\n줄바꿈')).toBe('한글과\n줄바꿈');
  });

  it('탭과 공백 유지', () => {
    expect(extractHangul('Tab\t과 공백')).toBe('\t과 공백');
  });

  it('모음은 추출하지 않는다', () => {
    expect(extractHangul('ㅠㅠ')).toBe('ㅠㅠ');
  });

  it('자음은 추출하지 않는다', () => {
    expect(extractHangul('ㄱㄴㄱㄴ')).toBe('ㄱㄴㄱㄴ');
  });
});
