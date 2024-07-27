import { romanize } from './romanize';

describe('romanize', () => {
  it('자음 사이에서 동화 작용이 일어나는 경우', () => {
    expect(romanize('백마')).toBe('baengma');
    expect(romanize('종로')).toBe('jongno');
    expect(romanize('왕십리')).toBe('wangsimni');
    expect(romanize('별래')).toBe('byeollae');
    expect(romanize('신라')).toBe('silla');
  });

  it('ㄴ, ㄹ’이 덧나는 경우', () => {
    expect(romanize('학여울')).toBe('hangnyeoul');
    expect(romanize('알약')).toBe('allyak');
  });

  it('구개음화가 되는 경우', () => {
    expect(romanize('해돋이')).toBe('haedoji');
    expect(romanize('같이')).toBe('gachi');
    expect(romanize('굳히다')).toBe('guchida');
  });

  it('"ㄱ, ㄷ, ㅂ, ㅈ"이 "ㅎ"과 합하여 거센소리로 소리 나는 경우', () => {
    expect(romanize('좋고')).toBe('joko');
    expect(romanize('놓다')).toBe('nota');
    expect(romanize('잡혀')).toBe('japyeo');
    expect(romanize('낳지')).toBe('nachi');
  });

  it('된소리되기는 표기에 반영하지 않는다', () => {
    expect(romanize('압구정')).toBe('apgujeong');
    expect(romanize('낙동강')).toBe('nakdonggang');
    expect(romanize('죽변')).toBe('jukbyeon');
    expect(romanize('낙성대')).toBe('nakseongdae');
    expect(romanize('합정')).toBe('hapjeong');
    expect(romanize('팔당')).toBe('paldang');
    expect(romanize('샛별')).toBe('saetbyeol');
    expect(romanize('울산')).toBe('ulsan');
  });

  it('"ㄱ, ㄷ, ㅂ"은 모음 앞에서는 "g, d, b"로, 자음 앞이나 어말에서는 "k, t, p"로 적는다', () => {
    expect(romanize('구미')).toBe('gumi');
    expect(romanize('영동')).toBe('yeongdong');
    expect(romanize('백암')).toBe('baegam');
    expect(romanize('옥천')).toBe('okcheon');
    expect(romanize('합덕')).toBe('hapdeok');
    expect(romanize('호법')).toBe('hobeop');
    expect(romanize('월곶')).toBe('wolgot');
    expect(romanize('벚꽃')).toBe('beotkkot');
    expect(romanize('한밭')).toBe('hanbat');
  });

  it('"ㄹ"은 모음 앞에서는 "r"로, 자음 앞이나 어말에서는 "l"로 적는다. 단, "ㄹㄹ"은 "ll"로 적는다', () => {
    expect(romanize('구리')).toBe('guri');
    expect(romanize('설악')).toBe('seorak');
    expect(romanize('칠곡')).toBe('chilgok');
    expect(romanize('임실')).toBe('imsil');
    expect(romanize('울릉')).toBe('ulleung');
    expect(romanize('대관령')).toBe('daegwallyeong');
  });

  it('완성된 음절이 아닌 경우에는 그대로 반환한다', () => {
    expect(romanize('ㄱ')).toBe('g');
    expect(romanize('가나다라ㅁㅂㅅㅇ')).toBe('ganadarambs');
    expect(romanize('ㅏ')).toBe('a');
    expect(romanize('ㅘ')).toBe('wa');
  });

  it('특수문자는 로마자 표기로 변경하지 않는다', () => {
    expect(romanize('안녕하세요.')).toBe('annyeonghaseyo.');
    expect(romanize('한국어!')).toBe('hangugeo!');
    expect(romanize('')).toBe('');
    expect(romanize('!?/')).toBe('!?/');
  });

  it('한글과 영어가 혼합된 경우에는 영어는 그대로 반환된다', () => {
    expect(romanize('안녕하세요 es-hangul')).toBe('annyeonghaseyo es-hangul');
    expect(romanize('한국은korea')).toBe('hangugeunkorea');
    expect(romanize('고양이는cat')).toBe('goyangineuncat');
  });
});
