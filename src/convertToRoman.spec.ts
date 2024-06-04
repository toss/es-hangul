import { convertToRoman } from './convertToRoman';

describe('convertToRoman', () => {
  it('자음 사이에서 동화 작용이 일어나는 경우', () => {
    expect(convertToRoman('백마')).toBe('baengma');
    expect(convertToRoman('종로')).toBe('jongno');
    expect(convertToRoman('왕십리')).toBe('wangsimni');
    expect(convertToRoman('별래')).toBe('byeollae');
    expect(convertToRoman('신라')).toBe('silla');
  });

  it('ㄴ, ㄹ’이 덧나는 경우', () => {
    expect(convertToRoman('학여울')).toBe('hangnyeoul');
    expect(convertToRoman('알약')).toBe('allyak');
  });

  it('구개음화가 되는 경우', () => {
    expect(convertToRoman('해돋이')).toBe('haedoji');
    expect(convertToRoman('같이')).toBe('gachi');
    expect(convertToRoman('굳히다')).toBe('guchida');
  });

  it('"ㄱ, ㄷ, ㅂ, ㅈ"이 "ㅎ"과 합하여 거센소리로 소리 나는 경우', () => {
    expect(convertToRoman('좋고')).toBe('joko');
    expect(convertToRoman('놓다')).toBe('nota');
    expect(convertToRoman('잡혀')).toBe('japyeo');
    expect(convertToRoman('낳지')).toBe('nachi');
  });

  it('된소리되기는 표기에 반영하지 않는다', () => {
    expect(convertToRoman('압구정')).toBe('apgujeong');
    expect(convertToRoman('낙동강')).toBe('nakdonggang');
    expect(convertToRoman('죽변')).toBe('jukbyeon');
    expect(convertToRoman('낙성대')).toBe('nakseongdae');
    expect(convertToRoman('합정')).toBe('hapjeong');
    expect(convertToRoman('팔당')).toBe('paldang');
    expect(convertToRoman('샛별')).toBe('saetbyeol');
    expect(convertToRoman('울산')).toBe('ulsan');
  });

  it('"ㄱ, ㄷ, ㅂ"은 모음 앞에서는 "g, d, b"로, 자음 앞이나 어말에서는 "k, t, p"로 적는다', () => {
    expect(convertToRoman('구미')).toBe('gumi');
    expect(convertToRoman('영동')).toBe('yeongdong');
    expect(convertToRoman('백암')).toBe('baegam');
    expect(convertToRoman('옥천')).toBe('okcheon');
    expect(convertToRoman('합덕')).toBe('hapdeok');
    expect(convertToRoman('호법')).toBe('hobeop');
    expect(convertToRoman('월곶')).toBe('wolgot');
    expect(convertToRoman('벚꽃')).toBe('beotkkot');
    expect(convertToRoman('한밭')).toBe('hanbat');
  });

  it('"ㄹ"은 모음 앞에서는 "r"로, 자음 앞이나 어말에서는 "l"로 적는다. 단, "ㄹㄹ"은 "ll"로 적는다', () => {
    expect(convertToRoman('구리')).toBe('guri');
    expect(convertToRoman('설악')).toBe('seorak');
    expect(convertToRoman('칠곡')).toBe('chilgok');
    expect(convertToRoman('임실')).toBe('imsil');
    expect(convertToRoman('울릉')).toBe('ulleung');
    expect(convertToRoman('대관령')).toBe('daegwallyeong');
  });

  it('완성된 음절이 아닌 경우에는 그대로 반환한다', () => {
    expect(convertToRoman('ㄱ')).toBe('g');
    expect(convertToRoman('가나다라ㅁㅂㅅㅇ')).toBe('ganadarambs');
    expect(convertToRoman('ㅏ')).toBe('a');
    expect(convertToRoman('ㅘ')).toBe('wa');
  });

  it('특수문자는 로마자 표기로 변경하지 않는다', () => {
    expect(convertToRoman('안녕하세요, 토스입니다.')).toBe('annyeonghaseyo, toseuimnida.');
    expect(convertToRoman('한국어!')).toBe('hangugeo!');
    expect(convertToRoman('')).toBe('');
    expect(convertToRoman('!?/')).toBe('!?/');
  });
});
