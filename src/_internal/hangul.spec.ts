import {
  binaryAssembleCharacters,
  binaryAssemble,
  isHangulAlphabet,
  isHangulCharacter,
  isHangul,
  assertHangul,
  parseHangul,
  safeParseHangul,
} from './hangul';

describe('isHangul*', () => {
  it('isHangulCharacter는 완성된 한글 문자를 받으면 true를 반환한다.', () => {
    expect(isHangulCharacter('가')).toBe(true);
    expect(isHangulCharacter('값')).toBe(true);
    expect(isHangulCharacter('ㄱ')).toBe(false);
    expect(isHangulCharacter('ㅏ')).toBe(false);
    expect(isHangulCharacter('a')).toBe(false);
  });

  it('isHangulAlphabet은 조합되지않은 한글 문자를 받으면 true를 반환한다.', () => {
    expect(isHangulAlphabet('가')).toBe(false);
    expect(isHangulAlphabet('값')).toBe(false);
    expect(isHangulAlphabet('ㄱ')).toBe(true);
    expect(isHangulAlphabet('ㅏ')).toBe(true);
    expect(isHangulAlphabet('a')).toBe(false);
  });

  it('isHangul은 한글 문자열을 받으면 true를 반환한다.', () => {
    expect(isHangul('값')).toBe(true);
    expect(isHangul('ㄱ')).toBe(true);
    expect(isHangul('ㅏ')).toBe(true);
    expect(isHangul('저는 고양이를 좋아합니다')).toBe(true);
    expect(isHangul('a')).toBe(false);
    expect(isHangul(111)).toBe(false);
    expect(isHangul([111, 111])).toBe(false);
    expect(isHangul({ a: 111 })).toBe(false);
  });
});

describe('parse', () => {
  it('parseHangul은 한글 문자열을 받으면 그대로 반환한다.', () => {
    expect(parseHangul('값')).toBe('값');
    expect(parseHangul('ㄱ')).toBe('ㄱ');
    expect(parseHangul('ㅏ')).toBe('ㅏ');
    expect(parseHangul('저는 고양이를 좋아합니다')).toBe('저는 고양이를 좋아합니다');
  });

  it('parseHangul은 한글 문자열이 아닌 값을 받으면 에러를 발생시킨다.', () => {
    expect(() => parseHangul(111)).toThrowError('111 is not a valid hangul string');
    expect(() => parseHangul([111, 111])).toThrowError('[111,111] is not a valid hangul string');
    expect(() => parseHangul({ a: 111 })).toThrowError('{"a":111} is not a valid hangul string');
  });

  it('safeParseHangul은 한글 문자열을 받으면 성공 객체를 반환한다.', () => {
    expect(safeParseHangul('값')).toEqual({ success: true, data: '값' });
    expect(safeParseHangul('ㄱ')).toEqual({ success: true, data: 'ㄱ' });
    expect(safeParseHangul('ㅏ')).toEqual({ success: true, data: 'ㅏ' });
    expect(safeParseHangul('저는 고양이를 좋아합니다')).toEqual({ success: true, data: '저는 고양이를 좋아합니다' });
  });

  it('safeParseHangul은 한글 문자열이 아닌 값을 받으면 실패 객체를 반환한다.', () => {
    expect(safeParseHangul(111)).toEqual({ success: false, error: Error('111 is not a valid hangul string') });
    expect(safeParseHangul([111, 111])).toEqual({
      success: false,
      error: Error('[111,111] is not a valid hangul string'),
    });
    expect(safeParseHangul({ a: 111 })).toEqual({
      success: false,
      error: Error('{"a":111} is not a valid hangul string'),
    });
  });
});

describe('binaryAssembleCharacters', () => {
  it('초성과 중성만 조합', () => {
    expect(binaryAssembleCharacters('ㄱ', 'ㅏ')).toEqual('가');
  });

  it('초성과 중성이 합쳐진 문자와 종성을 조합', () => {
    expect(binaryAssembleCharacters('가', 'ㅇ')).toEqual('강');
  });

  it('초성과 중성과 종성이 합쳐진 문자와 자음을 조합하여 겹받침 만들기', () => {
    expect(binaryAssembleCharacters('갑', 'ㅅ')).toEqual('값');
  });

  it('초성과 중성이 합쳐진 문자와 모음을 조립하여 겹모음 만들기', () => {
    expect(binaryAssembleCharacters('고', 'ㅏ')).toEqual('과');
  });

  it('초성과 중성(겹모음)이 합쳐진 문자와 자음을 조합', () => {
    expect(binaryAssembleCharacters('과', 'ㄱ')).toEqual('곽');
  });

  it('초성과 중성(겹모음)과 종성이 합쳐진 문자와 자음을 조합하여 겹받침 만들기', () => {
    expect(binaryAssembleCharacters('완', 'ㅈ')).toEqual('왅');
  });

  it('모음만 있는 문자와 모음을 조합하여 겹모음 만들기', () => {
    expect(binaryAssembleCharacters('ㅗ', 'ㅏ')).toEqual('ㅘ');
  });

  it('초성과 중성과 종성이 합쳐진 문자의 연음 법칙', () => {
    expect(binaryAssembleCharacters('톳', 'ㅡ')).toEqual('토스');
  });

  it('초성과 종성(겹모음)과 종성이 합쳐진 문자의 연음 법칙', () => {
    expect(binaryAssembleCharacters('왅', 'ㅓ')).toEqual('완저');
  });

  it('초성과 중성과 종성(겹받침)이 합쳐진 문자의 연음 법칙', () => {
    expect(binaryAssembleCharacters('닭', 'ㅏ')).toEqual('달가');
    expect(binaryAssembleCharacters('깎', 'ㅏ')).toEqual('까까');
  });

  it('문법에 맞지 않는 문자를 조합하면 단순 Join 한다. (문법 순서 틀림)', () => {
    expect(binaryAssembleCharacters('ㅏ', 'ㄱ')).toEqual('ㅏㄱ');
    expect(binaryAssembleCharacters('까', 'ㅃ')).toEqual('까ㅃ');
    expect(binaryAssembleCharacters('ㅘ', 'ㅏ')).toEqual('ㅘㅏ');
  });

  it('순서대로 입력했을 때 조합이 불가능한 문자라면 단순 Join 한다.', () => {
    expect(binaryAssembleCharacters('뼈', 'ㅣ')).toEqual('뼈ㅣ');
  });

  it('소스가 두 글자 이상이라면 Invalid source 에러를 발생시킨다.', () => {
    expect(() => binaryAssembleCharacters('가나', 'ㄴ')).toThrowError(
      'Invalid source character: 가나. Source must be one character.'
    );
    expect(() => binaryAssembleCharacters('ㄱㄴ', 'ㅏ')).toThrowError(
      'Invalid source character: ㄱㄴ. Source must be one character.'
    );
  });

  it('다음 문자가 한글 문자 한 글자가 아니라면 Invalid next character 에러를 발생시킨다.', () => {
    assert.throws(
      () => binaryAssembleCharacters('ㄱ', 'a'),
      Error,
      'Invalid next character: a. Next character must be one of the choseong, jungseong, or jongseong.'
    );
    assert.throws(
      () => binaryAssembleCharacters('ㄱ', 'ㅡㅏ'),
      Error,
      'Invalid next character: ㅡㅏ. Next character must be one of the choseong, jungseong, or jongseong.'
    );
  });
});

describe('binaryAssemble', () => {
  it('문장과 모음을 조합하여 다음 글자를 생성한다.', () => {
    expect(binaryAssemble('저는 고양이를 좋아합닏', 'ㅏ')).toEqual('저는 고양이를 좋아합니다');
  });

  it('문장과 자음을 조합하여 홑받침을 생성한다.', () => {
    expect(binaryAssemble('저는 고양이를 좋아하', 'ㅂ')).toEqual('저는 고양이를 좋아합');
  });

  it('문장과 자음을 조합하여 겹받침을 생성한다.', () => {
    expect(binaryAssemble('저는 고양이를 좋아합', 'ㅅ')).toEqual('저는 고양이를 좋아핪');
  });

  it('조합이 불가능한 자음이 입력되면 단순 Join 한다.', () => {
    expect(binaryAssemble('저는 고양이를 좋아합', 'ㄲ')).toEqual('저는 고양이를 좋아합ㄲ');
    expect(binaryAssemble('저는 고양이를 좋아합', 'ㅂ')).toEqual('저는 고양이를 좋아합ㅂ');
  });

  it('조합이 불가능한 모음이 입력되면 단순 Join 한다.', () => {
    expect(binaryAssemble('저는 고양이를 좋아하', 'ㅏ')).toEqual('저는 고양이를 좋아하ㅏ');
    expect(binaryAssemble('저는 고양이를 좋아합니다', 'ㅜ')).toEqual('저는 고양이를 좋아합니다ㅜ');
  });

  describe('assertHangul', () => {
    it('한글 문자열을 받으면 에러를 발생시키지 않는다.', () => {
      expect(() => assertHangul('ㄱ')).not.toThrowError();
      expect(() => assertHangul('고양이')).not.toThrowError();
      expect(() => assertHangul('저는 고양이를 좋아합니다')).not.toThrowError();
      expect(() => assertHangul('저는 고양이를 좋아합니ㄷ')).not.toThrowError();
    });

    it("한글 문자열이 아닌 값을 받으면 '___ is not a valid hangul string' 에러를 발생시킨다.", () => {
      expect(() => assertHangul('aaaaaa')).toThrowError('"aaaaaa" is not a valid hangul string');
      expect(() => assertHangul(111)).toThrowError('111 is not a valid hangul string');
      expect(() => assertHangul([111, 111])).toThrowError('[111,111] is not a valid hangul string');
      expect(() => assertHangul({ a: 111 })).toThrowError('{"a":111} is not a valid hangul string');
    });
  });
});
