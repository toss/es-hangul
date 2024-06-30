import { binaryAssembleHangulCharacters, binaryAssembleHangul, isHangulAlphabet, isHangulCharacter } from './hangul';

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
});

describe('binaryAssembleHangulCharacters', () => {
  it('초성과 중성만 조합', () => {
    expect(binaryAssembleHangulCharacters('ㄱ', 'ㅏ')).toEqual('가');
  });

  it('초성과 중성이 합쳐진 문자와 종성을 조합', () => {
    expect(binaryAssembleHangulCharacters('가', 'ㅇ')).toEqual('강');
  });

  it('초성과 중성과 종성이 합쳐진 문자와 자음을 조합하여 겹받침 만들기', () => {
    expect(binaryAssembleHangulCharacters('갑', 'ㅅ')).toEqual('값');
  });

  it('초성과 중성이 합쳐진 문자와 모음을 조립하여 겹모음 만들기', () => {
    expect(binaryAssembleHangulCharacters('고', 'ㅏ')).toEqual('과');
  });

  it('초성과 중성(겹모음)이 합쳐진 문자와 자음을 조합', () => {
    expect(binaryAssembleHangulCharacters('과', 'ㄱ')).toEqual('곽');
  });

  it('초성과 중성(겹모음)과 종성이 합쳐진 문자와 자음을 조합하여 겹받침 만들기', () => {
    expect(binaryAssembleHangulCharacters('완', 'ㅈ')).toEqual('왅');
  });

  it('모음만 있는 문자와 모음을 조합하여 겹모음 만들기', () => {
    expect(binaryAssembleHangulCharacters('ㅗ', 'ㅏ')).toEqual('ㅘ');
  });

  it('초성과 중성과 종성이 합쳐진 문자의 연음 법칙', () => {
    expect(binaryAssembleHangulCharacters('톳', 'ㅡ')).toEqual('토스');
  });

  it('초성과 종성(겹모음)과 종성이 합쳐진 문자의 연음 법칙', () => {
    expect(binaryAssembleHangulCharacters('왅', 'ㅓ')).toEqual('완저');
  });

  it('초성과 중성과 종성(겹받침)이 합쳐진 문자의 연음 법칙', () => {
    expect(binaryAssembleHangulCharacters('닭', 'ㅏ')).toEqual('달가');
    expect(binaryAssembleHangulCharacters('깎', 'ㅏ')).toEqual('까까');
  });

  it('문법에 맞지 않는 문자를 조합하면 단순 Join 한다. (문법 순서 틀림)', () => {
    expect(binaryAssembleHangulCharacters('ㅏ', 'ㄱ')).toEqual('ㅏㄱ');
    expect(binaryAssembleHangulCharacters('까', 'ㅃ')).toEqual('까ㅃ');
    expect(binaryAssembleHangulCharacters('ㅘ', 'ㅏ')).toEqual('ㅘㅏ');
  });

  it('순서대로 입력했을 때 조합이 불가능한 문자라면 단순 Join 한다.', () => {
    expect(binaryAssembleHangulCharacters('뼈', 'ㅣ')).toEqual('뼈ㅣ');
  });

  it('소스가 두 글자 이상이라면 Invalid source 에러를 발생시킨다.', () => {
    assert.throws(
      () => binaryAssembleHangulCharacters('가나', 'ㄴ'),
      Error,
      'Invalid source character: 가나. Source must be one character.'
    );
    assert.throws(
      () => binaryAssembleHangulCharacters('ㄱㄴ', 'ㅏ'),
      Error,
      'Invalid source character: ㄱㄴ. Source must be one character.'
    );
  });

  it('다음 문자가 한글 문자 한 글자가 아니라면 Invalid next character 에러를 발생시킨다.', () => {
    assert.throws(
      () => binaryAssembleHangulCharacters('ㄱ', 'a'),
      Error,
      'Invalid next character: a. Next character must be one of the chosung, jungsung, or jongsung.'
    );
    assert.throws(
      () => binaryAssembleHangulCharacters('ㄱ', 'ㅡㅏ'),
      Error,
      'Invalid next character: ㅡㅏ. Next character must be one of the chosung, jungsung, or jongsung.'
    );
  });
});

describe('binaryAssembleHangul', () => {
  it('문장과 모음을 조합하여 다음 글자를 생성한다.', () => {
    expect(binaryAssembleHangul('저는 고양이를 좋아합닏', 'ㅏ')).toEqual('저는 고양이를 좋아합니다');
  });

  it('문장과 자음을 조합하여 홑받침을 생성한다.', () => {
    expect(binaryAssembleHangul('저는 고양이를 좋아하', 'ㅂ')).toEqual('저는 고양이를 좋아합');
  });

  it('문장과 자음을 조합하여 겹받침을 생성한다.', () => {
    expect(binaryAssembleHangul('저는 고양이를 좋아합', 'ㅅ')).toEqual('저는 고양이를 좋아핪');
  });

  it('조합이 불가능한 자음이 입력되면 단순 Join 한다.', () => {
    expect(binaryAssembleHangul('저는 고양이를 좋아합', 'ㄲ')).toEqual('저는 고양이를 좋아합ㄲ');
    expect(binaryAssembleHangul('저는 고양이를 좋아합', 'ㅂ')).toEqual('저는 고양이를 좋아합ㅂ');
  });

  it('조합이 불가능한 모음이 입력되면 단순 Join 한다.', () => {
    expect(binaryAssembleHangul('저는 고양이를 좋아하', 'ㅏ')).toEqual('저는 고양이를 좋아하ㅏ');
    expect(binaryAssembleHangul('저는 고양이를 좋아합니다', 'ㅜ')).toEqual('저는 고양이를 좋아합니다ㅜ');
  });
});
