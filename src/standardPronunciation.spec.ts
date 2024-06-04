import { standardPronunciation } from './standardPronunciation';

describe('standardPronunciation', () => {
  describe('음절이 완성된 한글을 제외한 문자는 변경하지 않는다', () => {
    it('단일 자모는 그대로 반환한다', () => {
      expect(standardPronunciation('ㄱㄴㄷㄹㅏㅓㅑㅙ')).toBe('ㄱㄴㄷㄹㅏㅓㅑㅙ');
    });

    it('특수문자는 그대로 반환한다', () => {
      expect(standardPronunciation('!?')).toBe('!?');
    });

    it('영어는 그대로 반환한다', () => {
      expect(standardPronunciation('hello')).toBe('hello');
    });

    it('숫자는 그대로 반환한다', () => {
      expect(standardPronunciation('1234567890')).toBe('1234567890');
    });

    it('빈 문자열은 그대로 반환한다', () => {
      expect(standardPronunciation('')).toBe('');
    });
  });

  describe('한글은 음성 표기법으로 변경한다', () => {
    describe('16항', () => {
      it('한글 자모의 이름은 그 받침소리를 연음하되, "ㄷ, ㅈ, ㅊ, ㅋ, ㅌ, ㅍ, ㅎ"의 경우에는 특별히 다음과 같이 발음한다', () => {
        expect(standardPronunciation('디귿이')).toBe('디그시');
        expect(standardPronunciation('지읒이')).toBe('지으시');
        expect(standardPronunciation('치읓이')).toBe('치으시');
        expect(standardPronunciation('키읔이')).toBe('키으기');
        expect(standardPronunciation('티읕이')).toBe('티으시');
        expect(standardPronunciation('피읖이')).toBe('피으비');
        expect(standardPronunciation('히읗이')).toBe('히으시');
      });

      it('자모의 이름이 "ㄱ, ㄴ, ㄹ, ㅁ, ㅂ, ㅅ, ㅇ"일 경우', () => {
        expect(standardPronunciation('기역이')).toBe('기여기');
        expect(standardPronunciation('니은이')).toBe('니으니');
        expect(standardPronunciation('리을이')).toBe('리으리');
        expect(standardPronunciation('미음이')).toBe('미으미');
        expect(standardPronunciation('비읍이')).toBe('비으비');
        expect(standardPronunciation('이응이')).toBe('이응이');
      });
    });

    describe('17항', () => {
      it('받침 "ㄷ", "ㅌ(ㄾ)"이 조사나 접미사의 모음 "ㅣ"와 결합되는 경우에는, "ㅈ", "ㅊ"으로 바꾸어서 뒤 음절 첫소리로 옮겨 발음한다', () => {
        expect(standardPronunciation('곧이듣다')).toBe('고지듣다');
        expect(standardPronunciation('굳이')).toBe('구지');
        expect(standardPronunciation('미닫이')).toBe('미다지');
        expect(standardPronunciation('땀받이')).toBe('땀바지');
        expect(standardPronunciation('밭이')).toBe('바치');
        expect(standardPronunciation('벼훑이')).toBe('벼훌치');
      });

      it('"ㄷ" 뒤에 접미사 "히"가 결합되어 "티"를 이루는 것은 "치"로 발음한다', () => {
        expect(standardPronunciation('굳히다')).toBe('구치다');
        expect(standardPronunciation('닫히다')).toBe('다치다');
        expect(standardPronunciation('묻히다')).toBe('무치다');
      });
    });

    describe('"ㄴ/ㄹ"이 덧나는 경우', () => {
      it('받침이 "ㄱ, ㄴ, ㄷ, ㅁ, ㅂ, ㅇ"이고 다음 음절이 "야, 여, 요, 유, 이, 얘, 예"로 이어지는 경우', () => {
        expect(standardPronunciation('학여울')).toBe('항녀울');
        expect(standardPronunciation('맨입')).toBe('맨닙');
        expect(standardPronunciation('담요')).toBe('담뇨');
        expect(standardPronunciation('영업용')).toBe('영엄뇽');
        expect(standardPronunciation('콩엿')).toBe('콩녇');
        expect(standardPronunciation('알약')).toBe('알략');
      });

      it('받침이 "ㄹ"이고 다음 음절이 "야, 여, 요, 유, 이, 얘, 예"로 이어지는 경우', () => {
        expect(standardPronunciation('알약')).toBe('알략');
        expect(standardPronunciation('서울역')).toBe('서울력');
        expect(standardPronunciation('불여우')).toBe('불려우');
      });
    });

    describe('19항', () => {
      it('받침 "ㅁ, ㅇ" 뒤에 연결되는 "ㄹ"은 "ㄴ"으로 발음한다', () => {
        expect(standardPronunciation('담력')).toBe('담녁');
        expect(standardPronunciation('침략')).toBe('침냑');
        expect(standardPronunciation('강릉')).toBe('강능');
        expect(standardPronunciation('항로')).toBe('항노');
        expect(standardPronunciation('대통령')).toBe('대통녕');
      });

      it('받침 "ㄱ, ㅂ" 뒤에 연결되는 "ㄹ"도 "ㄴ"으로 발음한다', () => {
        expect(standardPronunciation('막론')).toBe('망논');
        expect(standardPronunciation('석류')).toBe('성뉴');
        expect(standardPronunciation('협력')).toBe('혐녁');
        expect(standardPronunciation('법리')).toBe('범니');
      });
    });

    describe('18항: 받침 "ㄱ, ㄲ, ㅋ, ㄳ, ㄺ" / "ㄷ, ㅅ, ㅆ, ㅈ, ㅊ, ㅌ, ㅎ" / "ㅂ, ㅍ, ㄼ, ㄿ, ㅄ"은 "ㄴ, ㅁ" 앞에서 "ㅇ, ㄴ, ㅁ"으로 발음한다', () => {
      it('받침 "ㄱ, ㄲ, ㅋ, ㄳ, ㄺ"일 경우', () => {
        expect(standardPronunciation('먹는')).toBe('멍는');
        expect(standardPronunciation('깎는')).toBe('깡는');
        expect(standardPronunciation('키읔만')).toBe('키응만');
        expect(standardPronunciation('몫몫이')).toBe('몽목씨');
        expect(standardPronunciation('긁는')).toBe('긍는');
      });

      it('받침 "ㄷ, ㅅ, ㅆ, ㅈ, ㅊ, ㅌ, ㅎ"일 경우', () => {
        expect(standardPronunciation('닫는')).toBe('단는');
        expect(standardPronunciation('짓는')).toBe('진는');
        expect(standardPronunciation('있는')).toBe('인는');
        expect(standardPronunciation('맞는')).toBe('만는');
        expect(standardPronunciation('쫓는')).toBe('쫀는');
        expect(standardPronunciation('붙는')).toBe('분는');
        expect(standardPronunciation('놓는')).toBe('논는');
      });

      it('받침 "ㅂ, ㅍ, ㄼ, ㄿ, ㅄ"일 경우', () => {
        expect(standardPronunciation('잡는')).toBe('잠는');
        expect(standardPronunciation('앞마당')).toBe('암마당');
        expect(standardPronunciation('밟는')).toBe('밤는');
        expect(standardPronunciation('읊는')).toBe('음는');
        expect(standardPronunciation('없는')).toBe('엄는');
      });
    });

    describe('20항', () => {
      it('"ㄴ"은 "ㄹ"의 앞이나 뒤에서 "ㄹ"로 발음한다', () => {
        expect(standardPronunciation('난로')).toBe('날로');
        expect(standardPronunciation('신라')).toBe('실라');
        expect(standardPronunciation('천리')).toBe('철리');
        expect(standardPronunciation('대관령')).toBe('대괄령');
        expect(standardPronunciation('칼날')).toBe('칼랄');
      });

      it('첫소리 "ㄴ"이 "ㅀ, ㄾ" 뒤에 연결되는 경우에도 "ㄹ"로 발음한다', () => {
        expect(standardPronunciation('닳는')).toBe('달른');
        expect(standardPronunciation('핥네')).toBe('할레');
      });
    });

    describe('12항', () => {
      it('"ㅎ, ㄶ, ㅀ" 뒤에 "ㄱ, ㄷ, ㅈ"이 결합되는 경우에는, 뒤 음절 첫소리와 합쳐서 "ㅋ, ㅌ, ㅊ"으로 발음한다', () => {
        expect(standardPronunciation('놓고')).toBe('노코');
        expect(standardPronunciation('좋던')).toBe('조턴');
        expect(standardPronunciation('쌓지')).toBe('싸치');
        expect(standardPronunciation('많고')).toBe('만코');
        expect(standardPronunciation('않던')).toBe('안턴');
        expect(standardPronunciation('닳지')).toBe('달치');
      });

      it('받침 "ㄱ, ㄺ, ㄷ, ㅂ, ㄼ, ㅈ, ㄵ"이 뒤 음절 첫소리 "ㅎ"과 결합되는 경우에도, 역시 두 음을 합쳐서 "ㅋ, ㅌ, ㅍ, ㅊ"으로 발음한다', () => {
        expect(standardPronunciation('각하')).toBe('가카');
        expect(standardPronunciation('먹히다')).toBe('머키다');
        expect(standardPronunciation('밝히다')).toBe('발키다');
        expect(standardPronunciation('맏형')).toBe('마텽');
        expect(standardPronunciation('좁히다')).toBe('조피다');
        expect(standardPronunciation('넓히다')).toBe('널피다');
        expect(standardPronunciation('꽂히다')).toBe('꼬치다');
        expect(standardPronunciation('앉히다')).toBe('안치다');
      });

      it('"ㅎ, ㄶ, ㅀ" 뒤에 "ㅅ"이 결합되는 경우에는, "ㅅ"을 "ㅆ"으로 발음한다', () => {
        expect(standardPronunciation('닿소')).toBe('다쏘');
        expect(standardPronunciation('많소')).toBe('만쏘');
        expect(standardPronunciation('싫소')).toBe('실쏘');
      });

      it('"ㅎ" 뒤에 "ㄴ"이 결합되는 경우에는 "ㄴ"으로 발음한다', () => {
        expect(standardPronunciation('놓는')).toBe('논는');
        expect(standardPronunciation('쌓네')).toBe('싼네');
      });

      it('"ㄶ, ㅀ" 뒤에 "ㄴ"이 결합되는 경우에는, "ㅎ"을 발음하지 않는다', () => {
        expect(standardPronunciation('않네')).toBe('안네');
        expect(standardPronunciation('않는')).toBe('안는');
        expect(standardPronunciation('뚫네')).toBe('뚤레');
        expect(standardPronunciation('뚫는')).toBe('뚤른');
      });

      it('"ㅎ, ㄶ, ㅀ" 뒤에 모음으로 시작된 어미나 접미사가 결합되는 경우에는 "ㅎ"을 발음하지 않는다', () => {
        expect(standardPronunciation('낳은')).toBe('나은');
        expect(standardPronunciation('놓아')).toBe('노아');
        expect(standardPronunciation('쌓이다')).toBe('싸이다');
        expect(standardPronunciation('많아')).toBe('마나');
        expect(standardPronunciation('않은')).toBe('아는');
        expect(standardPronunciation('닳아')).toBe('다라');
        expect(standardPronunciation('싫어도')).toBe('시러도');
      });

      it('"다음 음절이 없는 경우"', () => {
        expect(standardPronunciation('많')).toBe('만');
        expect(standardPronunciation('싫')).toBe('실');
      });
    });

    describe('13항', () => {
      it('홑받침이나 쌍받침이 모음으로 시작된 조사나 어미, 접미사와 결합되는 경우에는, 제 음가대로 뒤 음절 첫소리로 옮겨 발음한다', () => {
        expect(standardPronunciation('깎아')).toBe('까까');
        expect(standardPronunciation('옷이')).toBe('오시');
        expect(standardPronunciation('있어')).toBe('이써');
        expect(standardPronunciation('낮이')).toBe('나지');
        expect(standardPronunciation('앞으로')).toBe('아프로');
      });
    });

    describe('14항', () => {
      it('겹받침이 모음으로 시작된 조사나 어미, 접미사와 결합되는 경우에는, 뒤엣것만을 뒤 음절 첫소리로 옮겨 발음한다', () => {
        expect(standardPronunciation('닭을')).toBe('달글');
        expect(standardPronunciation('젊어')).toBe('절머');
        expect(standardPronunciation('곬이')).toBe('골씨');
        expect(standardPronunciation('핥아')).toBe('할타');
      });
    });

    describe('9항', () => {
      it('받침 "ㄲ, ㅋ" / "ㅅ, ㅆ, ㅈ, ㅊ, ㅌ" / "ㅍ"은 어말 또는 자음 앞에서 각각 대표음 "ㄱ, ㄷ, ㅂ"으로 발음한다', () => {
        expect(standardPronunciation('닦다')).toBe('닥다');
        expect(standardPronunciation('키읔')).toBe('키윽');

        expect(standardPronunciation('옷')).toBe('옫');
        expect(standardPronunciation('있다')).toBe('읻다');
        expect(standardPronunciation('젖')).toBe('젇');
        expect(standardPronunciation('빚다')).toBe('빋다');
        expect(standardPronunciation('꽃')).toBe('꼳');
        expect(standardPronunciation('솥')).toBe('솓');

        expect(standardPronunciation('앞')).toBe('압');
        expect(standardPronunciation('덮다')).toBe('덥다');
      });
    });

    describe('10항', () => {
      it('겹받침 "ㄳ" / "ㄵ" / "ㄼ, ㄽ, ㄾ" / "ㅄ"은 어말 또는 자음 앞에서 각각 "ㄱ, ㄴ, ㄹ, ㅂ"으로 발음한다', () => {
        expect(standardPronunciation('넋')).toBe('넉');

        expect(standardPronunciation('앉다')).toBe('안다');

        expect(standardPronunciation('여덟')).toBe('여덜');
        expect(standardPronunciation('외곬')).toBe('외골');
        expect(standardPronunciation('핥다')).toBe('할다');

        expect(standardPronunciation('값')).toBe('갑');
      });
    });

    describe('11항', () => {
      it('겹받침 "ㄺ" / "ㄻ" / "ㄿ"은 어말 또는 자음 앞에서 각각 "ㄱ, ㅁ, ㅂ"으로 발음한다', () => {
        expect(standardPronunciation('닭')).toBe('닥');
        expect(standardPronunciation('맑다')).toBe('막다');

        expect(standardPronunciation('삶')).toBe('삼');
        expect(standardPronunciation('젊다')).toBe('점다');

        expect(standardPronunciation('읊고')).toBe('읍고');
        expect(standardPronunciation('읊다')).toBe('읍다');
      });
    });
  });
});
