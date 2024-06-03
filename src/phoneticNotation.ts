import { combineHangulCharacter } from './combineHangulCharacter';
import { disassembleCompleteHangulCharacter } from './disassembleCompleteHangulCharacter';
import { isNotUndefined } from './utils';

type NotHangul = {
  index: number;
  syllable: string;
};

const 음가가_없는_자음 = 'ㅇ';
const 자음_REGEX = /^[ㄱ-ㅎ]$/;
const 모음_REGEX = /^[ㅏ-ㅣ]$/;
const 한글_REGEX = /^[가-힣]$/;
const 한글_자모 = ['기역', '니은', '리을', '미음', '비읍', '시옷', '이응'];
const 특별한_한글_자모 = ['디귿', '지읒', '치읓', '키읔', '티읕', '피읖', '히읗'];

function is단일자모(자모: string) {
  return 자음_REGEX.test(자모) || 모음_REGEX.test(자모);
}

function 음절분해(hangulPhrase: string) {
  const notHangulPhrase: NotHangul[] = [];
  const disassembleHangul = Array.from(hangulPhrase)
    .filter((syllable, index) => {
      if (!한글_REGEX.test(syllable) || is단일자모(syllable)) {
        notHangulPhrase.push({
          index,
          syllable,
        });

        return false;
      }

      return true;
    })
    .map(syllable => disassembleCompleteHangulCharacter(syllable))
    .filter(isNotUndefined);

  return { notHangulPhrase, disassembleHangul };
}

export function phoneticNotation(hangul: string): string {
  if (!hangul) {
    return '';
  }

  const hangulPhrases = hangul.split(' ');
  const changedHangul: string[] = [];

  for (const hangulPhrase of hangulPhrases) {
    const { notHangulPhrase, disassembleHangul } = 음절분해(hangulPhrase);

    for (let i = 0; i < disassembleHangul.length; i += 1) {
      const currentSyllable = disassembleHangul[i];
      const nextSyllable =
        disassembleHangul.length > 1 && i < disassembleHangul.length - 1 ? disassembleHangul[i + 1] : null;

      /* 
      제16항 - 한글 자모의 이름은 그 받침소리를 연음하되, ‘ㄷ, ㅈ, ㅊ, ㅋ, ㅌ, ㅍ, ㅎ’의 경우에는 특별히 다음과 같이 발음한다.
      ㄷ, ㅈ, ㅊ, ㅌ, ㅎ > ㅅ (디귿이:디그시, 지읒이:지으시, 치읓이:치으시, 티읕이:티으시, 히읗이:히으시)
      ㅋ > ㄱ (키읔이:키으기)
      ㅍ > ㅂ (피읖이:피으비)
    */
      if (i > 0 && currentSyllable.last && nextSyllable?.first === 음가가_없는_자음) {
        console.log('i-1 🟢: ', i - 1);
        const combinedSyllables = hangulPhrase[i - 1] + hangulPhrase[i];

        if (특별한_한글_자모.includes(combinedSyllables)) {
          if (['ㄷ', 'ㅈ', 'ㅊ', 'ㅌ', 'ㅎ'].includes(currentSyllable.last)) {
            currentSyllable.last = '';
            nextSyllable.first = 'ㅅ';
          } else if (['ㅋ'].includes(currentSyllable.last)) {
            currentSyllable.last = '';
            nextSyllable.first = 'ㄱ';
          } else {
            currentSyllable.last = '';
            nextSyllable.first = 'ㅂ';
          }
          continue;
        } else if (한글_자모.includes(combinedSyllables)) {
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
      if (currentSyllable && nextSyllable && nextSyllable.middle === 'ㅣ') {
        if (nextSyllable.first === 'ㅇ') {
          if (['ㄷ'].includes(currentSyllable.last)) {
            nextSyllable.first = 'ㅈ';
            currentSyllable.last = '';
          } else if (['ㅌ'].includes(currentSyllable.last)) {
            nextSyllable.first = 'ㅊ';
            currentSyllable.last = '';
          } else if (['ㄹㅌ'].includes(currentSyllable.last)) {
            nextSyllable.first = 'ㅊ';
            currentSyllable.last = currentSyllable.last[0] as typeof currentSyllable.last;
          }
        } else if (nextSyllable.first === 'ㅎ' && ['ㄷ'].includes(currentSyllable.last)) {
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
        currentSyllable &&
        currentSyllable.last &&
        nextSyllable &&
        nextSyllable.first === 'ㅇ' &&
        ['ㅑ', 'ㅕ', 'ㅛ', 'ㅠ', 'ㅣ', 'ㅒ', 'ㅖ'].includes(nextSyllable.middle)
      ) {
        if (['ㄱ', 'ㄴ', 'ㄷ', 'ㅁ', 'ㅂ', 'ㅇ'].includes(currentSyllable.last)) {
          if (currentSyllable.last === 'ㄱ') {
            currentSyllable.last = 'ㅇ';
          }
          nextSyllable.first = 'ㄴ';
        } else if (['ㄹ'].includes(currentSyllable.last)) {
          nextSyllable.first = 'ㄹ';
        }
      }

      /* 
        19항 - 받침 ‘ㅁ, ㅇ’ 뒤에 연결되는 ‘ㄹ’은 [ㄴ]으로 발음한다.
        [붙임] 받침 ‘ㄱ, ㅂ’ 뒤에 연결되는 ‘ㄹ’도 [ㄴ]으로 발음한다.
      */
      if (
        currentSyllable &&
        ['ㅁ', 'ㅇ', 'ㄱ', 'ㅂ'].includes(currentSyllable.last) &&
        nextSyllable &&
        nextSyllable.first === 'ㄹ'
      ) {
        nextSyllable.first = 'ㄴ';
      }

      /* 
        18항 - 받침 ‘ㄱ(ㄲ, ㅋ, ㄳ, ㄺ), ㄷ(ㅅ, ㅆ, ㅈ, ㅊ, ㅌ, ㅎ), ㅂ(ㅍ, ㄼ, ㄿ, ㅄ)’은 ‘ㄴ, ㅁ’ 앞에서 [ㅇ, ㄴ, ㅁ]으로 발음한다.
      */
      if (currentSyllable && currentSyllable.last && nextSyllable && ['ㄴ', 'ㅁ'].includes(nextSyllable.first)) {
        if (['ㄱ', 'ㄲ', 'ㅋ', 'ㄱㅅ', 'ㄹㄱ'].includes(currentSyllable.last)) {
          currentSyllable.last = 'ㅇ';
        } else if (['ㄷ', 'ㅅ', 'ㅆ', 'ㅈ', 'ㅊ', 'ㅌ', 'ㅎ'].includes(currentSyllable.last)) {
          currentSyllable.last = 'ㄴ';
        } else if (['ㅂ', 'ㅍ', 'ㄹㅂ', 'ㄹㅍ', 'ㅂㅅ'].includes(currentSyllable.last)) {
          currentSyllable.last = 'ㅁ';
        }
      }

      /* 
        20항 - ‘ㄴ’은 ‘ㄹ’의 앞이나 뒤에서 [ㄹ]로 발음한다.
        [붙임] 첫소리 ‘ㄴ’이 ‘ㅀ’, ‘ㄾ’ 뒤에 연결되는 경우에도 이에 준한다.
      */
      if (currentSyllable && nextSyllable) {
        if (currentSyllable.last === 'ㄴ' && nextSyllable.first === 'ㄹ') {
          currentSyllable.last = 'ㄹ';
        } else if (currentSyllable.last === 'ㄹ' && nextSyllable.first === 'ㄴ') {
          nextSyllable.first = 'ㄹ';
        } else if (['ㄹㅎ', 'ㄹㅌ'].includes(currentSyllable.last) && nextSyllable.first === 'ㄴ') {
          nextSyllable.first = 'ㄹ';
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

      if (currentSyllable?.last) {
        if (['ㅎ', 'ㄴㅎ', 'ㄹㅎ'].includes(currentSyllable.last)) {
          if (nextSyllable) {
            const pronunciation = {
              ㄱ: 'ㅋ',
              ㄷ: 'ㅌ',
              ㅈ: 'ㅊ',
              ㅅ: 'ㅆ',
            } as const;

            if (['ㄱ', 'ㄷ', 'ㅈ', 'ㅅ'].includes(nextSyllable.first)) {
              nextSyllable.first = pronunciation[nextSyllable.first as keyof typeof pronunciation];
              currentSyllable.last = currentSyllable.last.replace('ㅎ', '') as typeof currentSyllable.last;
            } else if (nextSyllable.first === 'ㄴ' && ['ㄴㅎ', 'ㄹㅎ'].includes(currentSyllable.last)) {
              currentSyllable.last = currentSyllable.last.replace('ㅎ', '') as typeof currentSyllable.last;
            } else if (nextSyllable.first === 음가가_없는_자음) {
              if (['ㄴㅎ', 'ㄹㅎ'].includes(currentSyllable.last)) {
                currentSyllable.last = currentSyllable.last.replace('ㅎ', '') as typeof currentSyllable.last;
              } else {
                currentSyllable.last = '';
              }
            } else {
              currentSyllable.last = currentSyllable.last.replace('ㅎ', '') as typeof currentSyllable.last;
            }
          } else {
            currentSyllable.last = currentSyllable.last.replace('ㅎ', '') as typeof currentSyllable.last;
          }
        } else if (
          ['ㄱ', 'ㄹㄱ', 'ㄷ', 'ㅂ', 'ㄹㅂ', 'ㅈ', 'ㄴㅈ'].includes(currentSyllable.last) &&
          nextSyllable &&
          ['ㅎ'].includes(nextSyllable.first)
        ) {
          const pronunciation = {
            ㄱ: 'ㅋ',
            ㄹㄱ: 'ㅋ',
            ㄷ: 'ㅌ',
            ㅂ: 'ㅍ',
            ㄹㅂ: 'ㅍ',
            ㅈ: 'ㅊ',
            ㄴㅈ: 'ㅊ',
          } as const;

          nextSyllable.first = pronunciation[currentSyllable.last as keyof typeof pronunciation];

          if (currentSyllable.last.length === 1) {
            currentSyllable.last = '';
          } else {
            currentSyllable.last = currentSyllable.last[0] as typeof currentSyllable.last;
          }
        }
      }

      /*
      제13항 - 홑받침이나 쌍받침이 모음으로 시작된 조사나 어미, 접미사와 결합되는 경우에는, 제 음가대로 뒤 음절 첫소리로 옮겨 발음한다.
      제14항 -  겹받침이 모음으로 시작된 조사나 어미, 접미사와 결합되는 경우에는, 뒤엣것만을 뒤 음절 첫소리로 옮겨 발음한다.
    */
      const is음가없는자음앞 = currentSyllable?.last && nextSyllable && nextSyllable.first === 음가가_없는_자음;

      if (is음가없는자음앞) {
        if (
          (nextSyllable.first === 음가가_없는_자음 &&
            !['ㅇ', ''].includes(currentSyllable.last) &&
            currentSyllable.last.length === 1) ||
          (currentSyllable.last.length === 2 && currentSyllable.last[0] === currentSyllable.last[1])
        ) {
          // 15항이 여길 통과하고 있음. 형식 형태소, 실질 형태소 구분 못함
          nextSyllable.first = currentSyllable.last as typeof nextSyllable.first;
          currentSyllable.last = '';
        } else if (currentSyllable.last.length > 1 && currentSyllable.last[0] !== currentSyllable.last[1]) {
          if (currentSyllable.last[1] === 'ㅅ') {
            nextSyllable.first = 'ㅆ';
          } else {
            nextSyllable.first = currentSyllable.last[1] as typeof nextSyllable.first;
          }

          currentSyllable.last = currentSyllable.last.replace(
            currentSyllable.last[1],
            ''
          ) as typeof currentSyllable.last;
        }
      }

      /*
        제4장 받침의 발음
        제9항 - 받침 ‘ㄲ, ㅋ’, ‘ㅅ, ㅆ, ㅈ, ㅊ, ㅌ’, ‘ㅍ’은 어말 또는 자음 앞에서 각각 대표음 [ㄱ, ㄷ, ㅂ]으로 발음한다.
        제10항 - 겹받침 ‘ㄳ’, ‘ㄵ’, ‘ㄼ, ㄽ, ㄾ’, ‘ㅄ’은 어말 또는 자음 앞에서 각각 [ㄱ, ㄴ, ㄹ, ㅂ]으로 발음한다.
        제11항 - 겹받침 ‘ㄺ, ㄻ, ㄿ’은 어말 또는 자음 앞에서 각각 [ㄱ, ㅁ, ㅂ]으로 발음한다.
      */
      const is어말 = currentSyllable?.last && !nextSyllable;
      const is음가있는자음앞 = currentSyllable?.last && nextSyllable && nextSyllable.first !== 음가가_없는_자음;

      if (is어말 || is음가있는자음앞) {
        if (['ㄲ', 'ㅋ', 'ㄱㅅ', 'ㄹㄱ'].includes(currentSyllable.last)) {
          currentSyllable.last = 'ㄱ';
        } else if (['ㅅ', 'ㅆ', 'ㅈ', 'ㅊ', 'ㅌ'].includes(currentSyllable.last)) {
          currentSyllable.last = 'ㄷ';
        } else if (['ㅍ', 'ㅂㅅ', 'ㄹㅍ'].includes(currentSyllable.last)) {
          currentSyllable.last = 'ㅂ';
        } else if (['ㄴㅈ'].includes(currentSyllable.last)) {
          currentSyllable.last = 'ㄴ';
        } else if (['ㄹㅂ', 'ㄹㅅ', 'ㄹㅌ'].includes(currentSyllable.last)) {
          currentSyllable.last = 'ㄹ';
        } else if (['ㄹㅁ'].includes(currentSyllable.last)) {
          currentSyllable.last = 'ㅁ';
        }
      }
    }

    const combineAllPhrase = disassembleHangul.filter(isNotUndefined).map(syllable => {
      return combineHangulCharacter(syllable.first, syllable.middle, syllable.last);
    });

    for (const { index, syllable } of notHangulPhrase) {
      combineAllPhrase.splice(index, 0, syllable);
    }

    changedHangul.push(combineAllPhrase.join(''));
  }

  return changedHangul.join(' ');
}
