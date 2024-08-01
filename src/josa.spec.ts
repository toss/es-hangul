import { josa } from './josa';

describe('josa', () => {
  it('주격조사', () => {
    expect(josa('샴푸', '이/가')).toBe('샴푸가');
    expect(josa('칫솔', '이/가')).toBe('칫솔이');
  });
  it('목적격조사', () => {
    expect(josa('샴푸', '을/를')).toBe('샴푸를');
    expect(josa('칫솔', '을/를')).toBe('칫솔을');
  });
  it('대조의 보조사', () => {
    expect(josa('샴푸', '은/는')).toBe('샴푸는');
    expect(josa('칫솔', '은/는')).toBe('칫솔은');
  });
  it('방향의 격조사', () => {
    expect(josa('바깥', '으로/로')).toBe('바깥으로');
    expect(josa('내부', '으로/로')).toBe('내부로');
  });
  it('방향의 격조사 ㄹ 받침 예외 처리', () => {
    expect(josa('지름길', '으로/로')).toBe('지름길로');
  });
  it('비교의 격조사', () => {
    expect(josa('샴푸', '와/과')).toBe('샴푸와');
    expect(josa('칫솔', '와/과')).toBe('칫솔과');
  });
  it('선택의 보조사', () => {
    expect(josa('샴푸', '이나/나')).toBe('샴푸나');
    expect(josa('칫솔', '이나/나')).toBe('칫솔이나');
  });
  it('화제의 보조사', () => {
    expect(josa('샴푸', '이란/란')).toBe('샴푸란');
    expect(josa('칫솔', '이란/란')).toBe('칫솔이란');
  });
  it('호격조사', () => {
    expect(josa('철수', '아/야')).toBe('철수야');
    expect(josa('길동', '아/야')).toBe('길동아');
  });
  it('접속조사', () => {
    expect(josa('고기', '이랑/랑')).toBe('고기랑');
    expect(josa('과일', '이랑/랑')).toBe('과일이랑');
  });
  it('주제의 보조사', () => {
    expect(josa('의사', '이라/라')).toBe('의사라');
    expect(josa('선생님', '이라/라')).toBe('선생님이라');
  });
  it('서술격조사와 종결어미', () => {
    expect(josa('사과', '이에요/예요')).toBe('사과예요');
    expect(josa('책', '이에요/예요')).toBe('책이에요');
  });
  it('서술격조사와 종결어미, "이" 로 끝나는 단어 예외 처리', () => {
    expect(josa('때밀이', '이에요/예요')).toBe('때밀이예요');
  });
  it('지위나 신분 또는 자격을 나타내는 위격조사', () => {
    expect(josa('학생', '으로서/로서')).toBe('학생으로서');
    expect(josa('부모', '으로서/로서')).toBe('부모로서');
  });
  it('지위나 신분 또는 자격을 나타내는 위격조사 ㄹ 받침 예외 처리', () => {
    expect(josa('라이벌', '으로서/로서')).toBe('라이벌로서');
  });
  it('수단의 의미를 나타내는 도구격조사', () => {
    expect(josa('토큰', '으로써/로써')).toBe('토큰으로써');
    expect(josa('함수', '으로써/로써')).toBe('함수로써');
  });
  it('수단의 의미를 나타내는 도구격조사 ㄹ 받침 예외 처리', () => {
    expect(josa('건물', '으로써/로써')).toBe('건물로써');
  });
  it('어떤 행동의 출발점이나 비롯되는 대상임을 나타내는 격 조사', () => {
    expect(josa('역삼동', '으로부터/로부터')).toBe('역삼동으로부터');
    expect(josa('저기', '으로부터/로부터')).toBe('저기로부터');
  });
  it('어떤 행동의 출발점이나 비롯되는 대상임을 나타내는 격 조사 ㄹ 받침 예외 처리', () => {
    expect(josa('동굴', '으로부터/로부터')).toBe('동굴로부터');
  });
  it('단어가 빈 문자열일 경우 빈 문자열을 반환한다.', () => {
    expect(josa('', '이/가')).toBe('');
  });
});

describe('josa.pick', () => {
  it('첫 번째 매개변수가 빈 문자열이라면 옵션 중 첫 번째 값을 반환한다.', () => {
    expect(josa.pick('', '이/가')).toBe('이');
  });
  it('주격조사', () => {
    expect(josa.pick('샴푸', '이/가')).toBe('가');
    expect(josa.pick('칫솔', '이/가')).toBe('이');
  });
  it('목적격조사', () => {
    expect(josa.pick('샴푸', '을/를')).toBe('를');
    expect(josa.pick('칫솔', '을/를')).toBe('을');
  });
  it('대조의 보조사', () => {
    expect(josa.pick('샴푸', '은/는')).toBe('는');
    expect(josa.pick('칫솔', '은/는')).toBe('은');
  });
  it('방향의 격조사', () => {
    expect(josa.pick('바깥', '으로/로')).toBe('으로');
    expect(josa.pick('내부', '으로/로')).toBe('로');
  });
  it('방향의 격조사 ㄹ 받침 예외 처리', () => {
    expect(josa.pick('지름길', '으로/로')).toBe('로');
  });
  it('비교의 격조사', () => {
    expect(josa.pick('샴푸', '와/과')).toBe('와');
    expect(josa.pick('칫솔', '와/과')).toBe('과');
  });
  it('선택의 보조사', () => {
    expect(josa.pick('샴푸', '이나/나')).toBe('나');
    expect(josa.pick('칫솔', '이나/나')).toBe('이나');
  });
  it('화제의 보조사', () => {
    expect(josa.pick('샴푸', '이란/란')).toBe('란');
    expect(josa.pick('칫솔', '이란/란')).toBe('이란');
  });
  it('호격조사', () => {
    expect(josa.pick('철수', '아/야')).toBe('야');
    expect(josa.pick('길동', '아/야')).toBe('아');
  });
  it('접속조사', () => {
    expect(josa.pick('고기', '이랑/랑')).toBe('랑');
    expect(josa.pick('과일', '이랑/랑')).toBe('이랑');
  });
  it('서술격조사와 종결어미', () => {
    expect(josa.pick('사과', '이에요/예요')).toBe('예요');
    expect(josa.pick('책', '이에요/예요')).toBe('이에요');
  });
  it('서술격조사와 종결어미, "이" 로 끝나는 단어 예외 처리', () => {
    expect(josa.pick('때밀이', '이에요/예요')).toBe('예요');
  });
  it('지위나 신분 또는 자격을 나타내는 위격조사', () => {
    expect(josa.pick('학생', '으로서/로서')).toBe('으로서');
    expect(josa.pick('부모', '으로서/로서')).toBe('로서');
  });
  it('지위나 신분 또는 자격을 나타내는 위격조사 ㄹ 받침 예외 처리', () => {
    expect(josa.pick('라이벌', '으로서/로서')).toBe('로서');
  });
  it('수단의 의미를 나타내는 도구격조사', () => {
    expect(josa.pick('토큰', '으로써/로써')).toBe('으로써');
    expect(josa.pick('함수', '으로써/로써')).toBe('로써');
  });
  it('수단의 의미를 나타내는 도구격조사 ㄹ 받침 예외 처리', () => {
    expect(josa.pick('건물', '으로써/로써')).toBe('로써');
  });
  it('어떤 행동의 출발점이나 비롯되는 대상임을 나타내는 격 조사', () => {
    expect(josa.pick('역삼동', '으로부터/로부터')).toBe('으로부터');
    expect(josa.pick('저기', '으로부터/로부터')).toBe('로부터');
  });
  it('어떤 행동의 출발점이나 비롯되는 대상임을 나타내는 격 조사 ㄹ 받침 예외 처리', () => {
    expect(josa.pick('동굴', '으로부터/로부터')).toBe('로부터');
  });
});
