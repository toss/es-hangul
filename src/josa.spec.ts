import { describe, expect, it } from 'vitest';
import { josa } from './josa';

describe('Hangul', () => {
  describe('josa', () => {
    it('주격조사', () => {
      expect(josa('샴푸', '이/가')).toBe('샴푸가');
      expect(josa('칫솔', '이/가')).toBe('칫솔이');
      expect(josa('샴푸(보습)', '이/가')).toBe('샴푸(보습)가');
      expect(josa('칫솔(전동)', '이/가')).toBe('칫솔(전동)이');
    });
    it('목적격조사', () => {
      expect(josa('샴푸', '을/를')).toBe('샴푸를');
      expect(josa('칫솔', '을/를')).toBe('칫솔을');
      expect(josa('샴푸(보습)', '을/를')).toBe('샴푸(보습)를');
      expect(josa('칫솔(전동)', '을/를')).toBe('칫솔(전동)을');
    });
    it('대조의 보조사', () => {
      expect(josa('샴푸', '은/는')).toBe('샴푸는');
      expect(josa('칫솔', '은/는')).toBe('칫솔은');
      expect(josa('샴푸(보습)', '은/는')).toBe('샴푸(보습)는');
      expect(josa('칫솔(전동)', '은/는')).toBe('칫솔(전동)은');
    });
    it('방향의 격조사', () => {
      expect(josa('바깥', '으로/로')).toBe('바깥으로');
      expect(josa('내부', '으로/로')).toBe('내부로');
      expect(josa('바깥(정원)', '으로/로')).toBe('바깥(정원)으로');
      expect(josa('내부(거실)', '으로/로')).toBe('내부(거실)로');
    });
    it('방향의 격조사 ㄹ 받침 예외처리', () => {
      expect(josa('지름길', '으로/로')).toBe('지름길로');
      expect(josa('지름길(골목)', '으로/로')).toBe('지름길(골목)로');
    });
    it('비교의 격조사', () => {
      expect(josa('샴푸', '와/과')).toBe('샴푸와');
      expect(josa('칫솔', '와/과')).toBe('칫솔과');
      expect(josa('샴푸(보습)', '와/과')).toBe('샴푸(보습)와');
      expect(josa('칫솔(전동)', '와/과')).toBe('칫솔(전동)과');
    });
    it('선택의 보조사', () => {
      expect(josa('샴푸', '이나/나')).toBe('샴푸나');
      expect(josa('칫솔', '이나/나')).toBe('칫솔이나');
      expect(josa('샴푸(보습)', '이나/나')).toBe('샴푸(보습)나');
      expect(josa('칫솔(전동)', '이나/나')).toBe('칫솔(전동)이나');
    });
    it('화제의 보조사', () => {
      expect(josa('샴푸', '이란/란')).toBe('샴푸란');
      expect(josa('칫솔', '이란/란')).toBe('칫솔이란');
      expect(josa('샴푸(보습)', '이란/란')).toBe('샴푸(보습)란');
      expect(josa('칫솔(전동)', '이란/란')).toBe('칫솔(전동)이란');
    });
    it('호격조사', () => {
      expect(josa('철수', '아/야')).toBe('철수야');
      expect(josa('길동', '아/야')).toBe('길동아');
      expect(josa('철수(동료)', '아/야')).toBe('철수(동료)야');
      expect(josa('길동(동료)', '아/야')).toBe('길동(동료)아');
    });
    it('접속조사', () => {
      expect(josa('고기', '이랑/랑')).toBe('고기랑');
      expect(josa('과일', '이랑/랑')).toBe('과일이랑');
      expect(josa('고기(구이)', '이랑/랑')).toBe('고기(구이)랑');
      expect(josa('과일(사과)', '이랑/랑')).toBe('과일(사과)이랑');
    });
    it('서술격조사와 종결어미', () => {
      expect(josa('사과', '이에요/예요')).toBe('사과예요');
      expect(josa('책', '이에요/예요')).toBe('책이에요');
      expect(josa('사과(과일)', '이에요/예요')).toBe('사과(과일)예요');
      expect(josa('책(도서)', '이에요/예요')).toBe('책(도서)이에요');
    });
    it('서술격조사와 종결어미, "이" 로 끝나는 단어 예외처리', () => {
      expect(josa('때밀이', '이에요/예요')).toBe('때밀이예요');
      expect(josa('때밀이(목욕)', '이에요/예요')).toBe('때밀이(목욕)예요');
    });
    it('지위나 신분 또는 자격을 나타내는 위격조사', () => {
      expect(josa('학생', '으로서/로서')).toBe('학생으로서');
      expect(josa('부모', '으로서/로서')).toBe('부모로서');
      expect(josa('학생(대학생)', '으로서/로서')).toBe('학생(대학생)으로서');
      expect(josa('부모(어머니)', '으로서/로서')).toBe('부모(어머니)로서');
    });
    it('지위나 신분 또는 자격을 나타내는 위격조사 ㄹ 받침 예외처리', () => {
      expect(josa('라이벌', '으로서/로서')).toBe('라이벌로서');
      expect(josa('라이벌(경쟁자)', '으로서/로서')).toBe('라이벌(경쟁자)로서');
    });
    it('수단의 의미를 나타내는 도구격조사', () => {
      expect(josa('토큰', '으로써/로써')).toBe('토큰으로써');
      expect(josa('함수', '으로써/로써')).toBe('함수로써');
      expect(josa('토큰(CS)', '으로써/로써')).toBe('토큰(CS)으로써');
      expect(josa('함수(수학)', '으로써/로써')).toBe('함수(수학)로써');
    });
    it('수단의 의미를 나타내는 도구격조사 ㄹ 받침 예외처리', () => {
      expect(josa('건물', '으로써/로써')).toBe('건물로써');
      expect(josa('건물(사무소)', '으로써/로써')).toBe('건물(사무소)로써');
    });
    it('어떤 행동의 출발점이나 비롯되는 대상임을 나타내는 격 조사', () => {
      expect(josa('역삼동', '으로부터/로부터')).toBe('역삼동으로부터');
      expect(josa('저기', '으로부터/로부터')).toBe('저기로부터');
      expect(josa('역삼동(서울)', '으로부터/로부터')).toBe('역삼동(서울)으로부터');
      expect(josa('저기(공원)', '으로부터/로부터')).toBe('저기(공원)로부터');
    });
    it('어떤 행동의 출발점이나 비롯되는 대상임을 나타내는 격 조사 ㄹ 받침 예외처리', () => {
      expect(josa('동굴', '으로부터/로부터')).toBe('동굴로부터');
      expect(josa('동굴(바닷가)', '으로부터/로부터')).toBe('동굴(바닷가)로부터');
    });
  });

  describe('josa.pick', () => {
    it('주격조사', () => {
      expect(josa.pick('샴푸', '이/가')).toBe('가');
      expect(josa.pick('칫솔', '이/가')).toBe('이');
      expect(josa.pick('샴푸(보습)', '이/가')).toBe('가');
      expect(josa.pick('칫솔(전동)', '이/가')).toBe('이');
    });
    it('목적격조사', () => {
      expect(josa.pick('샴푸', '을/를')).toBe('를');
      expect(josa.pick('칫솔', '을/를')).toBe('을');
      expect(josa.pick('샴푸(보습)', '을/를')).toBe('를');
      expect(josa.pick('칫솔(전동)', '을/를')).toBe('을');
    });
    it('대조의 보조사', () => {
      expect(josa.pick('샴푸', '은/는')).toBe('는');
      expect(josa.pick('칫솔', '은/는')).toBe('은');
      expect(josa.pick('샴푸(보습)', '은/는')).toBe('는');
      expect(josa.pick('칫솔(전동)', '은/는')).toBe('은');
    });
    it('방향의 격조사', () => {
      expect(josa.pick('바깥', '으로/로')).toBe('으로');
      expect(josa.pick('내부', '으로/로')).toBe('로');
      expect(josa.pick('바깥(정원)', '으로/로')).toBe('으로');
      expect(josa.pick('내부(거실)', '으로/로')).toBe('로');
    });
    it('방향의 격조사 ㄹ 받침 예외처리', () => {
      expect(josa.pick('지름길', '으로/로')).toBe('로');
      expect(josa.pick('지름길(산책로)', '으로/로')).toBe('로');
    });
    it('비교의 격조사', () => {
      expect(josa.pick('샴푸', '와/과')).toBe('와');
      expect(josa.pick('칫솔', '와/과')).toBe('과');
      expect(josa.pick('샴푸(보습)', '와/과')).toBe('와');
      expect(josa.pick('칫솔(전동)', '와/과')).toBe('과');
    });
    it('선택의 보조사', () => {
      expect(josa.pick('샴푸', '이나/나')).toBe('나');
      expect(josa.pick('칫솔', '이나/나')).toBe('이나');
      expect(josa.pick('샴푸(보습)', '이나/나')).toBe('나');
      expect(josa.pick('칫솔(전동)', '이나/나')).toBe('이나');
    });
    it('화제의 보조사', () => {
      expect(josa.pick('샴푸', '이란/란')).toBe('란');
      expect(josa.pick('칫솔', '이란/란')).toBe('이란');
      expect(josa.pick('샴푸(보습)', '이란/란')).toBe('란');
      expect(josa.pick('칫솔(전동)', '이란/란')).toBe('이란');
    });
    it('호격조사', () => {
      expect(josa.pick('철수', '아/야')).toBe('야');
      expect(josa.pick('길동', '아/야')).toBe('아');
      expect(josa.pick('철수(동료)', '아/야')).toBe('야');
      expect(josa.pick('길동(동료)', '아/야')).toBe('아');
    });
    it('접속조사', () => {
      expect(josa.pick('고기', '이랑/랑')).toBe('랑');
      expect(josa.pick('과일', '이랑/랑')).toBe('이랑');
      expect(josa.pick('고기(구이)', '이랑/랑')).toBe('랑');
      expect(josa.pick('과일(사과)', '이랑/랑')).toBe('이랑');
    });
    it('서술격조사와 종결어미', () => {
      expect(josa.pick('사과', '이에요/예요')).toBe('예요');
      expect(josa.pick('책', '이에요/예요')).toBe('이에요');
      expect(josa.pick('사과(과일)', '이에요/예요')).toBe('예요');
      expect(josa.pick('책(도서)', '이에요/예요')).toBe('이에요');
    });
    it('서술격조사와 종결어미, "이" 로 끝나는 단어 예외처리', () => {
      expect(josa.pick('때밀이', '이에요/예요')).toBe('예요');
      expect(josa.pick('때밀이(목욕)', '이에요/예요')).toBe('예요');
    });
    it('지위나 신분 또는 자격을 나타내는 위격조사', () => {
      expect(josa.pick('학생', '으로서/로서')).toBe('으로서');
      expect(josa.pick('부모', '으로서/로서')).toBe('로서');
      expect(josa.pick('학생(대학생)', '으로서/로서')).toBe('으로서');
      expect(josa.pick('부모(어머니)', '으로서/로서')).toBe('로서');
    });
    it('지위나 신분 또는 자격을 나타내는 위격조사 ㄹ 받침 예외처리', () => {
      expect(josa.pick('라이벌', '으로서/로서')).toBe('로서');
      expect(josa.pick('라이벌(경쟁자)', '으로서/로서')).toBe('로서');
    });
    it('수단의 의미를 나타내는 도구격조사', () => {
      expect(josa.pick('토큰', '으로써/로써')).toBe('으로써');
      expect(josa.pick('함수', '으로써/로써')).toBe('로써');
      expect(josa.pick('토큰(CS)', '으로써/로써')).toBe('으로써');
      expect(josa.pick('함수(수학)', '으로써/로써')).toBe('로써');
    });
    it('수단의 의미를 나타내는 도구격조사 ㄹ 받침 예외처리', () => {
      expect(josa.pick('건물', '으로써/로써')).toBe('로써');
      expect(josa.pick('건물(사무소)', '으로써/로써')).toBe('로써');
    });
    it('어떤 행동의 출발점이나 비롯되는 대상임을 나타내는 격 조사', () => {
      expect(josa.pick('역삼동', '으로부터/로부터')).toBe('으로부터');
      expect(josa.pick('저기', '으로부터/로부터')).toBe('로부터');
      expect(josa.pick('역삼동(서울)', '으로부터/로부터')).toBe('으로부터');
      expect(josa.pick('저기(공원)', '으로부터/로부터')).toBe('로부터');
    });
    it('어떤 행동의 출발점이나 비롯되는 대상임을 나타내는 격 조사 ㄹ 받침 예외처리', () => {
      expect(josa.pick('동굴', '으로부터/로부터')).toBe('로부터');
      expect(josa.pick('동굴(바닷가)', '으로부터/로부터')).toBe('로부터');
    });
  });
});
