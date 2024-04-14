import { describe, expect, it } from 'vitest';
import { assembleHangul, binaryAssembleHangul, binaryAssembleHangulCharacters } from './assemble';

describe('binaryAssembleHangulCharacters', () => {
  it('초성과 중성만 조합', () => {
    expect(binaryAssembleHangulCharacters('ㄱ', 'ㅏ')).toEqual('가');
  });

  it('초성과 중성이 합쳐진 문자와 종성을 조합', () => {
    expect(binaryAssembleHangulCharacters('가', 'ㅇ')).toEqual('강');
  });

  it('초성과 중성이 합쳐진 문자와 겹받침을 조합', () => {
    expect(binaryAssembleHangulCharacters('가', 'ㅂㅅ')).toEqual('값');
  });

  it('초성과 중성과 종성이 합쳐진 문자와 자음을 조합하여 겹받침 만들기', () => {
    expect(binaryAssembleHangulCharacters('갑', 'ㅅ')).toEqual('값');
  });

  it('초성과 중성이 합쳐진 문자와 모음을 조립하여 겹모음 만들기', () => {
    expect(binaryAssembleHangulCharacters('고', 'ㅏ')).toEqual('과');
  });

  it('모음만 있는 문자와 모음을 조합하여 겹모음 만들기', () => {
    expect(binaryAssembleHangulCharacters('ㅗ', 'ㅏ')).toEqual('ㅘ');
  });

  it('초성과 중성과 종성이 합쳐진 문자의 연음 법칙', () => {
    expect(binaryAssembleHangulCharacters('톳', 'ㅡ')).toEqual('토스');
  });

  it('초성과 중성과 종성(겹받침)이 합쳐진 문자의 연음 법칙', () => {
    expect(binaryAssembleHangulCharacters('닭', 'ㅏ')).toEqual('달가');
    expect(binaryAssembleHangulCharacters('깎', 'ㅏ')).toEqual('까까');
  });

  it('문법에 맞지 않는 문자를 조합하면 단순 Join 한다 (문법 순서 틀림)', () => {
    expect(binaryAssembleHangulCharacters('ㅏ', 'ㄱ')).toEqual('ㅏㄱ');
    expect(binaryAssembleHangulCharacters('까', 'ㅃ')).toEqual('까ㅃ');
  });

  it('한 번에 입력할 수 없는 문자를 조합하면 단순 Join 한다', () => {
    expect(binaryAssembleHangulCharacters('뼈', 'ㅣ')).toEqual('뼈ㅣ');
  });
});

describe('binaryAssembleHangul', () => {
  it('문장과 모음을 조합하여 다음 글자를 생성한다', () => {
    expect(binaryAssembleHangul('저는 고양이를 좋아합닏', 'ㅏ')).toEqual('저는 고양이를 좋아합니다');
  });

  it('문장과 자음을 조합하여 홑받침을 생성한다', () => {
    expect(binaryAssembleHangul('저는 고양이를 좋아하', 'ㅂ')).toEqual('저는 고양이를 좋아합');
  });

  it('문장과 자음을 조합하여 겹받침을 생성한다', () => {
    expect(binaryAssembleHangul('저는 고양이를 좋아합', 'ㅅ')).toEqual('저는 고양이를 좋아핪');
  });

  it('조합이 불가능한 자음이 입력되면 단순 Join 한다', () => {
    expect(binaryAssembleHangul('저는 고양이를 좋아합', 'ㄲ')).toEqual('저는 고양이를 좋아합ㄲ');
    expect(binaryAssembleHangul('저는 고양이를 좋아합', 'ㅂ')).toEqual('저는 고양이를 좋아합ㅂ');
  });

  it('조합이 불가능한 모음이 입력되면 단순 Join 한다', () => {
    expect(binaryAssembleHangul('저는 고양이를 좋아하', 'ㅏ')).toEqual('저는 고양이를 좋아하ㅏ');
    expect(binaryAssembleHangul('저는 고양이를 좋아합니다', 'ㅜ')).toEqual('저는 고양이를 좋아합니다ㅜ');
  });
});

describe('assembleHangul', () => {
  it('온전한 한글과 한글 문자 조합', () => {
    expect(assembleHangul(['아버지가', ' ', '방ㅇ', 'ㅔ ', '들ㅇ', 'ㅓ갑니다'])).toEqual('아버지가 방에 들어갑니다');
  });
  it('온전한 한글만 조합', () => {
    expect(assembleHangul(['아버지가', ' ', '방에 ', '들어갑니다'])).toEqual('아버지가 방에 들어갑니다');
  });
  it('온전하지 않은 한글만 조합', () => {
    expect(assembleHangul(['ㅇ', 'ㅏ', 'ㅂ', 'ㅓ', 'ㅈ', 'ㅣ'])).toEqual('아버지');
  });
});
