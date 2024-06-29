import { romanizeHangul } from './romanizeHangul';

describe('romanizeHangul', () => {
  it('자음 사이에서 동화 작용이 일어나는 경우', () => {
    expect(romanizeHangul('백마')).toBe('baengma');
    expect(romanizeHangul('종로')).toBe('jongno');
    expect(romanizeHangul('왕십리')).toBe('wangsimni');
    expect(romanizeHangul('별래')).toBe('byeollae');
    expect(romanizeHangul('신라')).toBe('silla');
  });

  it('ㄴ, ㄹ’이 덧나는 경우', () => {
    expect(romanizeHangul('학여울')).toBe('hangnyeoul');
    expect(romanizeHangul('알약')).toBe('allyak');
  });

  it('구개음화가 되는 경우', () => {
    expect(romanizeHangul('해돋이')).toBe('haedoji');
    expect(romanizeHangul('같이')).toBe('gachi');
    expect(romanizeHangul('굳히다')).toBe('guchida');
  });

  it('"ㄱ, ㄷ, ㅂ, ㅈ"이 "ㅎ"과 합하여 거센소리로 소리 나는 경우', () => {
    expect(romanizeHangul('좋고')).toBe('joko');
    expect(romanizeHangul('놓다')).toBe('nota');
    expect(romanizeHangul('잡혀')).toBe('japyeo');
    expect(romanizeHangul('낳지')).toBe('nachi');
  });

  it('된소리되기는 표기에 반영하지 않는다', () => {
    expect(romanizeHangul('압구정')).toBe('apgujeong');
    expect(romanizeHangul('낙동강')).toBe('nakdonggang');
    expect(romanizeHangul('죽변')).toBe('jukbyeon');
    expect(romanizeHangul('낙성대')).toBe('nakseongdae');
    expect(romanizeHangul('합정')).toBe('hapjeong');
    expect(romanizeHangul('팔당')).toBe('paldang');
    expect(romanizeHangul('샛별')).toBe('saetbyeol');
    expect(romanizeHangul('울산')).toBe('ulsan');
  });

  it('"ㄱ, ㄷ, ㅂ"은 모음 앞에서는 "g, d, b"로, 자음 앞이나 어말에서는 "k, t, p"로 적는다', () => {
    expect(romanizeHangul('구미')).toBe('gumi');
    expect(romanizeHangul('영동')).toBe('yeongdong');
    expect(romanizeHangul('백암')).toBe('baegam');
    expect(romanizeHangul('옥천')).toBe('okcheon');
    expect(romanizeHangul('합덕')).toBe('hapdeok');
    expect(romanizeHangul('호법')).toBe('hobeop');
    expect(romanizeHangul('월곶')).toBe('wolgot');
    expect(romanizeHangul('벚꽃')).toBe('beotkkot');
    expect(romanizeHangul('한밭')).toBe('hanbat');
  });

  it('"ㄹ"은 모음 앞에서는 "r"로, 자음 앞이나 어말에서는 "l"로 적는다. 단, "ㄹㄹ"은 "ll"로 적는다', () => {
    expect(romanizeHangul('구리')).toBe('guri');
    expect(romanizeHangul('설악')).toBe('seorak');
    expect(romanizeHangul('칠곡')).toBe('chilgok');
    expect(romanizeHangul('임실')).toBe('imsil');
    expect(romanizeHangul('울릉')).toBe('ulleung');
    expect(romanizeHangul('대관령')).toBe('daegwallyeong');
  });

  it('완성된 음절이 아닌 경우에는 그대로 반환한다', () => {
    expect(romanizeHangul('ㄱ')).toBe('g');
    expect(romanizeHangul('가나다라ㅁㅂㅅㅇ')).toBe('ganadarambs');
    expect(romanizeHangul('ㅏ')).toBe('a');
    expect(romanizeHangul('ㅘ')).toBe('wa');
  });

  it('특수문자는 로마자 표기로 변경하지 않는다', () => {
    expect(romanizeHangul('안녕하세요')).toBe('annyeonghaseyo');
    expect(romanizeHangul('한국어!')).toBe('hangugeo!');
    expect(romanizeHangul('')).toBe('');
    expect(romanizeHangul('!?/')).toBe('!?/');
  });

  it('한글과 영어가 혼합된 경우에는 영어는 그대로 반환된다', () => {
    expect(romanizeHangul('안녕하세요 korea')).toBe('annyeonghaseyo korea');
    expect(romanizeHangul('고양이는cat')).toBe('goyangnineuncat');
  });
});
