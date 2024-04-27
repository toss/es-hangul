import { chosungIncludes } from './chosungIncludes';

describe('chosungIncludes', () => {
  describe('초성이 포함되어있다고 판단되는 경우', () => {
    it('"ㅍㄹㅌ" 문자열로 "프론트엔드"를 검색하면 true를 반환한다.', () => {
      expect(chosungIncludes('프론트엔드', 'ㅍㄹㅌ')).toBe(true);
    });

    it('"ㅍㄹㅌ" 문자열로 "00프론트엔드"를 검색하면 true를 반환한다.', () => {
      expect(chosungIncludes('00프론트엔드', 'ㅍㄹㅌ')).toBe(true);
    });

    it('"ㅍㄹㅌㅇㄷㄱㅂㅈ" 문자열로 "프론트엔드 개발자"를 검색하면 true를 반환한다.', () => {
      expect(chosungIncludes('프론트엔드 개발자', 'ㅍㄹㅌㅇㄷㄱㅂㅈ')).toBe(true);
    });

    it('"ㅍㄹㅌㅇㄷ ㄱㅂㅈ" 문자열로 "프론트엔드 개발자"를 검색하면 true를 반환한다.', () => {
      expect(chosungIncludes('프론트엔드 개발자', 'ㅍㄹㅌㅇㄷ ㄱㅂㅈ')).toBe(true);
    });
  });

  describe('초성이 포함되어있다고 판단되지 않는 경우', () => {
    it('"ㅍㅌ" 문자열로 "프론트엔드"를 검색하면 false를 반환한다.', () => {
      expect(chosungIncludes('프론트엔드', 'ㅍㅌ')).toBe(false);
    });

    it('빈 문자열로 "프론트엔드 개발자"를 검색하면 false를 반환한다.', () => {
      expect(chosungIncludes('프론트엔드 개발자', ' ')).toBe(false);
    });

    it('"푸롴트" 문자열로 "프론트엔드"를 검색하면 초성으로만 구성되어 있지 않아 false를 반환한다.', () => {
      expect(chosungIncludes('프론트엔드', '푸롴트')).toBe(false);
    });
  });
});
