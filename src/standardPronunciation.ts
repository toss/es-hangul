import { joinString } from './_internal';
import { isHangulAlphabet, isHangulCharacter } from './_internal/hangul';
import { combineHangulCharacter } from './combineHangulCharacter';
import { disassembleCompleteHangulCharacter } from './disassembleCompleteHangulCharacter';
import {
  ㄴㄹ이_덧나는_모음,
  ㄴㄹ이_덧나서_받침_ㄴ_변환,
  ㄴㄹ이_덧나서_받침_ㄹ_변환,
  된소리,
  된소리_받침,
  받침_대표음_발음,
  발음변환_받침_ㅎ,
  발음변환_받침_ㅎ_발음,
  발음변환_첫소리_ㅎ,
  발음변환_첫소리_ㅎ_발음,
  비음화_받침_ㄴ_변환,
  비음화_받침_ㅁ_변환,
  비음화_받침_ㅇ_변환,
  어간_받침,
  음가가_없는_자음,
  음의_동화_받침,
  자음동화_받침_ㄴ_변환,
  특별한_한글_자모,
  특별한_한글_자모의_발음,
  한글_자모,
} from './standardPronunciation.constants';
import { arrayIncludes, hasProperty, isNotUndefined } from './utils';

type NotHangul = {
  index: number;
  syllable: string;
};
type NonUndefined<T> = T extends undefined ? never : T;
type Syllable = NonUndefined<ReturnType<typeof disassembleCompleteHangulCharacter>>;

/**
 * 주어진 한글 문자열을 표준 발음으로 변환합니다.
 * @param hangul 한글 문자열을 입력합니다.
 * @param options 변환 옵션을 설정합니다.
 * @param options.hardConversion 경음화 등의 된소리를 적용할지 여부를 설정합니다. 기본값은 true입니다.
 * @returns 변환된 표준 발음 문자열을 반환합니다.
 */
export function standardPronunciation(
  hangul: string,
  options: {
    hardConversion: boolean;
  } = { hardConversion: true }
): string {
  if (!hangul) {
    return '';
  }

  const hangulPhrases = hangul.split(' ');
  const changedHangul: string[] = [];

  for (const hangulPhrase of hangulPhrases) {
    const { notHangulPhrase, disassembleHangul } = 음절분해(hangulPhrase);

    for (let i = 0; i < disassembleHangul.length; i += 1) {
      const currentSyllable = disassembleHangul[i];
      const nextSyllable = i < disassembleHangul.length - 1 ? disassembleHangul[i + 1] : null;

      if (options.hardConversion && nextSyllable) {
        nextSyllable.first = apply경음화(currentSyllable, nextSyllable);
      }

      /* 
        제16항 - 한글 자모의 이름은 그 받침소리를 연음하되, ‘ㄷ, ㅈ, ㅊ, ㅋ, ㅌ, ㅍ, ㅎ’의 경우에는 특별히 다음과 같이 발음한다.
        ㄷ, ㅈ, ㅊ, ㅌ, ㅎ > ㅅ (디귿이:디그시, 지읒이:지으시, 치읓이:치으시, 티읕이:티으시, 히읗이:히으시)
        ㅋ > ㄱ (키읔이:키으기)
        ㅍ > ㅂ (피읖이:피으비)
      */
      if (i > 0 && currentSyllable.last && nextSyllable?.first === 음가가_없는_자음) {
        const combinedSyllables = hangulPhrase[i - 1] + hangulPhrase[i];

        if (arrayIncludes(특별한_한글_자모, combinedSyllables)) {
          const 다음_음절의_초성 =
            특별한_한글_자모의_발음[currentSyllable.last as keyof typeof 특별한_한글_자모의_발음];

          currentSyllable.last = '';
          nextSyllable.first = 다음_음절의_초성;

          continue;
        } else if (arrayIncludes(한글_자모, combinedSyllables)) {
          nextSyllable.first = currentSyllable.last as typeof nextSyllable.first;

          if (currentSyllable.last !== 'ㅇ') {
            currentSyllable.last = '';
          }

          continue;
        }
      }

      /* 
        제 5장 - 음의 동화
        17항 - 받침 ‘ㄷ', 'ㅌ(ㄾ)’이 조사나 접미사의 모음 ‘ㅣ’와 결합되는 경우에는, [ㅈ, ㅊ]으로 바꾸어서 뒤 음절 첫소리로 옮겨 발음한다.
        [붙임] ‘ㄷ’ 뒤에 접미사 ‘히’가 결합되어 ‘티’를 이루는 것은 [치]로 발음한다.
      */
      if (nextSyllable?.middle === 'ㅣ') {
        if (nextSyllable.first === 'ㅇ' && currentSyllable.last in 음의_동화_받침) {
          nextSyllable.first = 음의_동화_받침[currentSyllable.last as keyof typeof 음의_동화_받침];
          currentSyllable.last = currentSyllable.last === 'ㄹㅌ' ? 'ㄹ' : '';
        } else if (nextSyllable.first === 'ㅎ' && currentSyllable.last === 'ㄷ') {
          nextSyllable.first = 'ㅊ';
          currentSyllable.last = '';
        }
      }

      /* 
        'ㄴ,ㄹ'이 덧나는 경우
        https://www.youtube.com/watch?v=Mm2JX2naqWk
        http://contents2.kocw.or.kr/KOCW/data/document/2020/seowon/choiyungon0805/12.pdf
      */
      if (
        currentSyllable.last &&
        nextSyllable?.first === 'ㅇ' &&
        arrayIncludes(ㄴㄹ이_덧나는_모음, nextSyllable.middle)
      ) {
        if (arrayIncludes(ㄴㄹ이_덧나서_받침_ㄴ_변환, currentSyllable.last)) {
          if (currentSyllable.last === 'ㄱ') {
            currentSyllable.last = 'ㅇ';
          }

          nextSyllable.first = 'ㄴ';
        } else if (arrayIncludes(ㄴㄹ이_덧나서_받침_ㄹ_변환, currentSyllable.last)) {
          nextSyllable.first = 'ㄹ';
        }
      }

      /* 
        19항 - 받침 ‘ㅁ, ㅇ’ 뒤에 연결되는 ‘ㄹ’은 [ㄴ]으로 발음한다.
        [붙임] 받침 ‘ㄱ, ㅂ’ 뒤에 연결되는 ‘ㄹ’도 [ㄴ]으로 발음한다.
      */
      if (arrayIncludes(자음동화_받침_ㄴ_변환, currentSyllable.last) && nextSyllable?.first === 'ㄹ') {
        nextSyllable.first = 'ㄴ';
      }

      /* 
        18항 - 받침 ‘ㄱ(ㄲ, ㅋ, ㄳ, ㄺ), ㄷ(ㅅ, ㅆ, ㅈ, ㅊ, ㅌ, ㅎ), ㅂ(ㅍ, ㄼ, ㄿ, ㅄ)’은 ‘ㄴ, ㅁ’ 앞에서 [ㅇ, ㄴ, ㅁ]으로 발음한다.
      */
      if (currentSyllable.last && nextSyllable && ['ㄴ', 'ㅁ'].includes(nextSyllable.first)) {
        if (arrayIncludes(비음화_받침_ㅇ_변환, currentSyllable.last)) {
          currentSyllable.last = 'ㅇ';
        } else if (arrayIncludes(비음화_받침_ㄴ_변환, currentSyllable.last)) {
          currentSyllable.last = 'ㄴ';
        } else if (arrayIncludes(비음화_받침_ㅁ_변환, currentSyllable.last)) {
          currentSyllable.last = 'ㅁ';
        }
      }

      /* 
        20항 - ‘ㄴ’은 ‘ㄹ’의 앞이나 뒤에서 [ㄹ]로 발음한다.
        [붙임] 첫소리 ‘ㄴ’이 ‘ㅀ’, ‘ㄾ’ 뒤에 연결되는 경우에도 이에 준한다.
      */
      if (nextSyllable) {
        if (currentSyllable.last === 'ㄴ' && nextSyllable.first === 'ㄹ') {
          currentSyllable.last = 'ㄹ';
        } else if (nextSyllable.first === 'ㄴ') {
          if (currentSyllable.last === 'ㄹ') {
            nextSyllable.first = 'ㄹ';
          } else if (['ㄹㅎ', 'ㄹㅌ'].includes(currentSyllable.last)) {
            nextSyllable.first = 'ㄹ';
          }
        }
      }

      /*
      제12항 받침 ‘ㅎ’의 발음은 다음과 같다.
      1. ‘ㅎ(ㄶ, ㅀ)’ 뒤에 ‘ㄱ, ㄷ, ㅈ’이 결합되는 경우에는, 뒤 음절 첫소리와 합쳐서 [ㅋ, ㅌ, ㅊ]으로 발음한다.
        [붙임 1] 받침 ‘ㄱ(ㄺ), ㄷ, ㅂ(ㄼ), ㅈ(ㄵ)’이 뒤 음절 첫소리 ‘ㅎ’과 결합되는 경우에도, 역시 두 음을 합쳐서 [ㅋ, ㅌ, ㅍ, ㅊ]으로 발음한다.
      2. ‘ㅎ(ㄶ, ㅀ)’ 뒤에 ‘ㅅ’이 결합되는 경우에는, ‘ㅅ’을 [ㅆ]으로 발음한다.
      3. ‘ㅎ’ 뒤에 ‘ㄴ’이 결합되는 경우에는, [ㄴ]으로 발음한다.
        [붙임] ‘ㄶ, ㅀ’ 뒤에 ‘ㄴ’이 결합되는 경우에는, ‘ㅎ’을 발음하지 않는다.
      4. ‘ㅎ(ㄶ, ㅀ)’ 뒤에 모음으로 시작된 어미나 접미사가 결합되는 경우에는, ‘ㅎ’을 발음하지 않는다.
    */

      if (currentSyllable.last) {
        if (arrayIncludes(발음변환_받침_ㅎ, currentSyllable.last)) {
          if (nextSyllable) {
            if (['ㄱ', 'ㄷ', 'ㅈ', 'ㅅ'].includes(nextSyllable.first)) {
              nextSyllable.first = 발음변환_받침_ㅎ_발음[nextSyllable.first as keyof typeof 발음변환_받침_ㅎ_발음];
              replace받침ㅎ(currentSyllable);
            } else if (nextSyllable.first === 'ㄴ' && ['ㄴㅎ', 'ㄹㅎ'].includes(currentSyllable.last)) {
              replace받침ㅎ(currentSyllable);
            } else if (nextSyllable.first === 음가가_없는_자음) {
              if (['ㄴㅎ', 'ㄹㅎ'].includes(currentSyllable.last)) {
                replace받침ㅎ(currentSyllable);
              } else {
                currentSyllable.last = '';
              }
            } else {
              replace받침ㅎ(currentSyllable);
            }
          } else {
            replace받침ㅎ(currentSyllable);
          }
        } else if (
          arrayIncludes(발음변환_첫소리_ㅎ, currentSyllable.last) &&
          nextSyllable &&
          ['ㅎ'].includes(nextSyllable.first)
        ) {
          nextSyllable.first = 발음변환_첫소리_ㅎ_발음[currentSyllable.last as keyof typeof 발음변환_첫소리_ㅎ_발음];
          currentSyllable.last =
            currentSyllable.last.length === 1
              ? ''
              : (currentSyllable.last = currentSyllable.last[0] as typeof currentSyllable.last);
        }
      }

      /*
      제13항 - 홑받침이나 쌍받침이 모음으로 시작된 조사나 어미, 접미사와 결합되는 경우에는, 제 음가대로 뒤 음절 첫소리로 옮겨 발음한다.
      제14항 - 겹받침이 모음으로 시작된 조사나 어미, 접미사와 결합되는 경우에는, 뒤엣것만을 뒤 음절 첫소리로 옮겨 발음한다.
    */
      const is음가없는자음앞 = currentSyllable.last && nextSyllable?.first === 음가가_없는_자음;

      if (is음가없는자음앞) {
        const is홑받침 = currentSyllable.last.length === 1;
        const is쌍받침 = currentSyllable.last.length === 2 && currentSyllable.last[0] === currentSyllable.last[1];
        const is겹받침 = currentSyllable.last.length === 2 && currentSyllable.last[0] !== currentSyllable.last[1];

        if (
          nextSyllable.first === 음가가_없는_자음 &&
          !['ㅇ', ''].includes(currentSyllable.last) &&
          (is홑받침 || is쌍받침)
        ) {
          nextSyllable.first = currentSyllable.last as Syllable['first'];
          currentSyllable.last = '';
        } else if (is겹받침) {
          if (currentSyllable.last[1] === 'ㅅ') {
            nextSyllable.first = 'ㅆ';
          } else {
            nextSyllable.first = currentSyllable.last[1] as Syllable['first'];
          }

          currentSyllable.last = currentSyllable.last.replace(currentSyllable.last[1], '') as Syllable['last'];
        }
      }

      /*
        제4장 받침의 발음
        제9항 - 받침 ‘ㄲ, ㅋ’, ‘ㅅ, ㅆ, ㅈ, ㅊ, ㅌ’, ‘ㅍ’은 어말 또는 자음 앞에서 각각 대표음 [ㄱ, ㄷ, ㅂ]으로 발음한다.
        제10항 - 겹받침 ‘ㄳ’, ‘ㄵ’, ‘ㄼ, ㄽ, ㄾ’, ‘ㅄ’은 어말 또는 자음 앞에서 각각 [ㄱ, ㄴ, ㄹ, ㅂ]으로 발음한다.
        제11항 - 겹받침 ‘ㄺ, ㄻ, ㄿ’은 어말 또는 자음 앞에서 각각 [ㄱ, ㅁ, ㅂ]으로 발음한다.
      */
      const is어말 = currentSyllable.last && !nextSyllable;
      const is음가있는자음앞 = currentSyllable.last && nextSyllable?.first !== 음가가_없는_자음;

      if (is어말 || is음가있는자음앞) {
        if (currentSyllable.last in 받침_대표음_발음) {
          currentSyllable.last = 받침_대표음_발음[currentSyllable.last as keyof typeof 받침_대표음_발음];
        }
      }
    }

    const changedSyllables = disassembleHangul
      .filter(isNotUndefined)
      .map(syllable => combineHangulCharacter(syllable.first, syllable.middle, syllable.last));

    for (const { index, syllable } of notHangulPhrase) {
      changedSyllables.splice(index, 0, syllable);
    }

    changedHangul.push(joinString(...changedSyllables));
  }

  return changedHangul.join(' ');
}

function 음절분해(hangulPhrase: string): {
  notHangulPhrase: NotHangul[];
  disassembleHangul: Syllable[];
} {
  const notHangulPhrase: NotHangul[] = [];
  const disassembleHangul = Array.from(hangulPhrase)
    .filter((syllable, index) => {
      if (!isHangulCharacter(syllable) || isHangulAlphabet(syllable)) {
        notHangulPhrase.push({
          index,
          syllable,
        });

        return false;
      }

      return true;
    })
    .map(disassembleCompleteHangulCharacter)
    .filter(isNotUndefined);

  return { notHangulPhrase, disassembleHangul };
}

function replace받침ㅎ(currentSyllable: Syllable): void {
  currentSyllable.last = currentSyllable.last.replace('ㅎ', '') as Syllable['last'];
}

/**
 * 제6장 경음화를 적용합니다.
 * @param currentSyllable 현재 음절을 입력합니다.
 * @param nextSyllable 다음 음절을 입력합니다.
 * @returns 변환된 다음 음절의 초성을 반환합니다.
 */
function apply경음화(currentSyllable: Syllable, nextSyllable: Syllable): Syllable['first'] {
  if (hasProperty(된소리, nextSyllable.first)) {
    /* 
      제23항 - 받침 ‘ㄱ(ㄲ, ㅋ, ㄳ, ㄺ), ㄷ(ㅅ, ㅆ, ㅈ, ㅊ, ㅌ), ㅂ(ㅍ, ㄼ, ㄿ, ㅄ)’ 뒤에 연결되는 ‘ㄱ, ㄷ, ㅂ, ㅅ, ㅈ’은 된소리로 발음한다.
    */
    const 제23항조건 = arrayIncludes(된소리_받침, currentSyllable.last);
    /*  
      제24항 - 어간 받침 ‘ㄴ(ㄵ), ㅁ(ㄻ)’ 뒤에 결합되는 어미의 첫소리 ‘ㄱ, ㄷ, ㅅ, ㅈ’은 된소리로 발음한다.
      제25항 - 어간 받침 ‘ㄼ, ㄾ’ 뒤에 결합되는 어미의 첫소리 ‘ㄱ, ㄷ, ㅅ, ㅈ’은 된소리로 발음한다.
    */
    const 제24_25항조건 = arrayIncludes(어간_받침, currentSyllable.last) && nextSyllable.first !== 'ㅂ';

    if (제23항조건 || 제24_25항조건) {
      return 된소리[nextSyllable.first];
    }
  }

  return nextSyllable.first;
}
