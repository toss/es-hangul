import { disassembleCompleteHangulCharacter } from '../disassembleCompleteHangulCharacter';
import { arrayIncludes, hasProperty } from '../utils';
import {
  ㄴㄹ이_덧나는_모음,
  ㄴㄹ이_덧나는_후속음절_모음,
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

export type NonUndefined<T> = T extends undefined ? never : T;
export type Nullable<T> = T | null | undefined;
export type Syllable = NonUndefined<ReturnType<typeof disassembleCompleteHangulCharacter>>;
type ChangedPronunciation = {
  isChanged: boolean;
};

function replace받침ㅎ(currentSyllable: Syllable): void {
  currentSyllable.last = currentSyllable.last.replace('ㅎ', '') as Syllable['last'];
}

/**
 * 제9, 10항, 11항을 적용합니다.
 * @description 제9항 - 받침 ‘ㄲ, ㅋ’, ‘ㅅ, ㅆ, ㅈ, ㅊ, ㅌ’, ‘ㅍ’은 어말 또는 자음 앞에서 각각 대표음 [ㄱ, ㄷ, ㅂ]으로 발음한다.
 * @description 제10항 - 겹받침 ‘ㄳ’, ‘ㄵ’, ‘ㄼ, ㄽ, ㄾ’, ‘ㅄ’은 어말 또는 자음 앞에서 각각 [ㄱ, ㄴ, ㄹ, ㅂ]으로 발음한다.
 * @description 제11항 - 겹받침 ‘ㄺ, ㄻ, ㄿ’은 어말 또는 자음 앞에서 각각 [ㄱ, ㅁ, ㅂ]으로 발음한다.
 * @param currentSyllable 현재 음절을 입력합니다.
 * @param nextSyllable 다음 음절을 입력합니다.
 */
export function apply제9와10과11항(currentSyllable: Syllable, nextSyllable: Nullable<Syllable>): void {
  const is어말 = currentSyllable.last && !nextSyllable;
  const is음가있는자음앞 = currentSyllable.last && nextSyllable?.first !== 음가가_없는_자음;

  const 제9_10_11항주요조건 = (is어말 || is음가있는자음앞) && hasProperty(받침_대표음_발음, currentSyllable.last);

  if (제9_10_11항주요조건) {
    currentSyllable.last = 받침_대표음_발음[currentSyllable.last as keyof typeof 받침_대표음_발음];
  }
}

/**
 * 제12항을 적용합니다.
 * @description 제12항 받침 ‘ㅎ’의 발음은 다음과 같다.
 * @description ‘ㅎ(ㄶ, ㅀ)’ 뒤에 ‘ㄱ, ㄷ, ㅈ’이 결합되는 경우에는, 뒤 음절 첫소리와 합쳐서 [ㅋ, ㅌ, ㅊ]으로 발음한다.
 * @description [붙임] 받침 ‘ㄱ(ㄺ), ㄷ, ㅂ(ㄼ), ㅈ(ㄵ)’이 뒤 음절 첫소리 ‘ㅎ’과 결합되는 경우에도, 역시 두 음을 합쳐서 [ㅋ, ㅌ, ㅍ, ㅊ]으로 발음한다.
 * @description ‘ㅎ(ㄶ, ㅀ)’ 뒤에 ‘ㅅ’이 결합되는 경우에는, ‘ㅅ’을 [ㅆ]으로 발음한다.
 * @description ‘ㅎ’ 뒤에 ‘ㄴ’이 결합되는 경우에는, [ㄴ]으로 발음한다.
 * @description [붙임] ‘ㄶ, ㅀ’ 뒤에 ‘ㄴ’이 결합되는 경우에는, ‘ㅎ’을 발음하지 않는다.
 * @description ‘ㅎ(ㄶ, ㅀ)’ 뒤에 모음으로 시작된 어미나 접미사가 결합되는 경우에는, ‘ㅎ’을 발음하지 않는다.
 * @param currentSyllable 현재 음절을 입력합니다.
 * @param nextSyllable 다음 음절을 입력합니다.
 */
export function apply제12항(currentSyllable: Syllable, nextSyllable: Nullable<Syllable>): void {
  if (!currentSyllable.last) {
    return;
  }

  if (arrayIncludes(발음변환_받침_ㅎ, currentSyllable.last)) {
    if (nextSyllable) {
      if (arrayIncludes(['ㄱ', 'ㄷ', 'ㅈ', 'ㅅ'], nextSyllable.first)) {
        nextSyllable.first = 발음변환_받침_ㅎ_발음[nextSyllable.first as keyof typeof 발음변환_받침_ㅎ_발음];
        replace받침ㅎ(currentSyllable);
        return;
      }

      if (nextSyllable.first === 'ㄴ' && arrayIncludes(['ㄴㅎ', 'ㄹㅎ'], currentSyllable.last)) {
        replace받침ㅎ(currentSyllable);
      }

      if (nextSyllable.first === 음가가_없는_자음) {
        if (arrayIncludes(['ㄴㅎ', 'ㄹㅎ'], currentSyllable.last)) {
          replace받침ㅎ(currentSyllable);
        } else {
          currentSyllable.last = '';
        }
      }

      if (nextSyllable.first !== 음가가_없는_자음) {
        replace받침ㅎ(currentSyllable);
      }
    }

    if (!nextSyllable) {
      replace받침ㅎ(currentSyllable);
    }
  }

  if (arrayIncludes(발음변환_첫소리_ㅎ, currentSyllable.last) && arrayIncludes(['ㅎ'], nextSyllable?.first)) {
    nextSyllable.first = 발음변환_첫소리_ㅎ_발음[currentSyllable.last];

    if (currentSyllable.last.length === 1) {
      currentSyllable.last = '';
    } else {
      currentSyllable.last = currentSyllable.last[0] as Syllable['last'];
    }
  }
}

/**
 * 제13, 14항을 적용합니다.
 * @description 제13항 - 홑받침이나 쌍받침이 모음으로 시작된 조사나 어미, 접미사와 결합되는 경우에는, 제 음가대로 뒤 음절 첫소리로 옮겨 발음한다.
 * @description 제14항 - 겹받침이 모음으로 시작된 조사나 어미, 접미사와 결합되는 경우에는, 뒤엣것만을 뒤 음절 첫소리로 옮겨 발음한다.
 * @param currentSyllable 현재 음절을 입력합니다.
 * @param nextSyllable 다음 음절을 입력합니다.
 * @returns 13, 14항이 적용되었는지의 여부를 반환합니다.
 */
export function apply제13과14항(currentSyllable: Syllable, nextSyllable: Syllable): ChangedPronunciation {
  const changedSyllable = {
    isChanged: false,
  };

  const 받침의길이 = {
    홀받침: 1,
    쌍_겹받침: 2,
  } as const;

  const 제13_14항주요조건 = currentSyllable.last && nextSyllable.first === 음가가_없는_자음;

  if (!제13_14항주요조건) {
    return changedSyllable;
  }

  const is홑받침 = currentSyllable.last.length === 받침의길이['홀받침'];
  const is쌍받침 =
    currentSyllable.last.length === 받침의길이['쌍_겹받침'] && currentSyllable.last[0] === currentSyllable.last[1];
  const is겹받침 =
    currentSyllable.last.length === 받침의길이['쌍_겹받침'] && currentSyllable.last[0] !== currentSyllable.last[1];

  if (!arrayIncludes(['ㅇ', ''], currentSyllable.last) && (is홑받침 || is쌍받침)) {
    nextSyllable.first = currentSyllable.last;
    currentSyllable.last = '';
    changedSyllable.isChanged = true;

    return changedSyllable;
  }

  if (is겹받침) {
    if (currentSyllable.last[1] === 'ㅅ') {
      nextSyllable.first = 'ㅆ';
    } else {
      nextSyllable.first = currentSyllable.last[1] as Syllable['first'];
    }

    currentSyllable.last = currentSyllable.last.replace(currentSyllable.last[1], '') as Syllable['last'];

    changedSyllable.isChanged = true;
    return changedSyllable;
  }

  return changedSyllable;
}

/**
 * 제16항을 적용합니다.
 * @description 제16항 - 한글 자모의 이름은 그 받침소리를 연음하되, ‘ㄷ, ㅈ, ㅊ, ㅋ, ㅌ, ㅍ, ㅎ’의 경우에는 특별히 다음과 같이 발음한다. ㄷ, ㅈ, ㅊ, ㅌ, ㅎ > ㅅ (디귿이:디그시, 지읒이:지으시, 치읓이:치으시, 티읕이:티으시, 히읗이:히으시), ㅋ > ㄱ (키읔이:키으기), ㅍ > ㅂ (피읖이:피으비)
 * @param currentSyllable 현재 음절을 입력합니다.
 * @param nextSyllable 다음 음절을 입력합니다.
 * @param hangulPhrase 분리되지 않은 한글 구절을 입력합니다.
 * @param index 현재 음절의 순서를 입력합니다.
 * @returns 16항이 적용되었는지의 여부를 반환합니다.
 */
export function apply제16항(
  currentSyllable: Syllable,
  nextSyllable: Syllable,
  hangulPhrase: string,
  index: number
): ChangedPronunciation {
  const changedSyllable = {
    nextSyllableChoseong: nextSyllable.first,
    currentSyllableJongseong: currentSyllable.last,
    isChanged: false,
  };

  const 제16항주요조건 = currentSyllable.last && nextSyllable.first === 음가가_없는_자음;

  if (!제16항주요조건) {
    return changedSyllable;
  }

  const combinedSyllables = hangulPhrase[index - 1] + hangulPhrase[index];

  if (arrayIncludes(특별한_한글_자모, combinedSyllables)) {
    const 다음_음절의_초성 = 특별한_한글_자모의_발음[currentSyllable.last as keyof typeof 특별한_한글_자모의_발음];

    currentSyllable.last = '';
    nextSyllable.first = 다음_음절의_초성;
    changedSyllable.isChanged = true;
  }

  if (arrayIncludes(한글_자모, combinedSyllables)) {
    nextSyllable.first = currentSyllable.last as typeof nextSyllable.first;

    if (currentSyllable.last !== 'ㅇ') {
      currentSyllable.last = '';
    }

    changedSyllable.isChanged = true;
  }

  return changedSyllable;
}

/**
 * 제17항을 적용합니다.
 * @description 17항 - 받침 ‘ㄷ', 'ㅌ(ㄾ)’이 조사나 접미사의 모음 ‘ㅣ’와 결합되는 경우에는, [ㅈ, ㅊ]으로 바꾸어서 뒤 음절 첫소리로 옮겨 발음한다.
 * @description [붙임] ‘ㄷ’ 뒤에 접미사 ‘히’가 결합되어 ‘티’를 이루는 것은 [치]로 발음한다.
 * @param currentSyllable 현재 음절을 입력합니다.
 * @param nextSyllable 다음 음절을 입력합니다.
 * @returns 17항이 적용되었는지의 여부를 반환합니다.
 */
export function apply제17항(currentSyllable: Syllable, nextSyllable: Syllable): ChangedPronunciation {
  const changedSyllable = {
    isChanged: false,
  };

  const 제17항주요조건 = nextSyllable.middle === 'ㅣ';

  if (!제17항주요조건) {
    return changedSyllable;
  }

  if (nextSyllable.first === 'ㅇ' && hasProperty(음의_동화_받침, currentSyllable.last)) {
    nextSyllable.first = 음의_동화_받침[currentSyllable.last];
    currentSyllable.last = currentSyllable.last === 'ㄹㅌ' ? 'ㄹ' : '';
    changedSyllable.isChanged = true;
  }

  if (nextSyllable.first === 'ㅎ' && currentSyllable.last === 'ㄷ') {
    nextSyllable.first = 'ㅊ';
    currentSyllable.last = '';
    changedSyllable.isChanged = true;
  }

  return changedSyllable;
}

/**
 * 제18항을 적용합니다.
 * @description 18항 - 받침 ‘ㄱ(ㄲ, ㅋ, ㄳ, ㄺ), ㄷ(ㅅ, ㅆ, ㅈ, ㅊ, ㅌ, ㅎ), ㅂ(ㅍ, ㄼ, ㄿ, ㅄ)’은 ‘ㄴ, ㅁ’ 앞에서 [ㅇ, ㄴ, ㅁ]으로 발음한다.
 * @param currentSyllable 현재 음절을 입력합니다.
 * @param nextSyllable 다음 음절을 입력합니다.
 * @returns 18항이 적용되었는지의 여부를 반환합니다.
 */
export function apply제18항(currentSyllable: Syllable, nextSyllable: Syllable): ChangedPronunciation {
  const changedSyllable = {
    isChanged: false,
  };

  const 제18항주요조건 = currentSyllable.last && arrayIncludes(['ㄴ', 'ㅁ'], nextSyllable.first);

  if (!제18항주요조건) {
    return changedSyllable;
  }

  if (arrayIncludes(비음화_받침_ㅇ_변환, currentSyllable.last)) {
    currentSyllable.last = 'ㅇ';
    changedSyllable.isChanged = true;
  }

  if (arrayIncludes(비음화_받침_ㄴ_변환, currentSyllable.last)) {
    currentSyllable.last = 'ㄴ';
    changedSyllable.isChanged = true;
  }

  if (arrayIncludes(비음화_받침_ㅁ_변환, currentSyllable.last)) {
    currentSyllable.last = 'ㅁ';
    changedSyllable.isChanged = true;
  }

  return changedSyllable;
}

/**
 * 제19항을 적용합니다.
 * @description 19항 - 받침 ‘ㅁ, ㅇ’ 뒤에 연결되는 ‘ㄹ’은 [ㄴ]으로 발음한다.
 * @description [붙임] 받침 ‘ㄱ, ㅂ’ 뒤에 연결되는 ‘ㄹ’도 [ㄴ]으로 발음한다.
 * @param currentSyllable 현재 음절을 입력합니다.
 * @param nextSyllable 다음 음절을 입력합니다.
 */
export function apply제19항(currentSyllable: Syllable, nextSyllable: Syllable): void {
  const 제19항조건 = arrayIncludes(자음동화_받침_ㄴ_변환, currentSyllable.last) && nextSyllable.first === 'ㄹ';

  if (제19항조건) {
    nextSyllable.first = 'ㄴ';
  }
}

/**
 * 제20항을 적용합니다.
 * @description 20항 - ‘ㄴ’은 ‘ㄹ’의 앞이나 뒤에서 [ㄹ]로 발음한다.
 * @description [붙임] 첫소리 ‘ㄴ’이 ‘ㅀ’, ‘ㄾ’ 뒤에 연결되는 경우에도 이에 준한다.
 * @param currentSyllable 현재 음절을 입력합니다.
 * @param nextSyllable 다음 음절을 입력합니다.
 */
export function apply제20항(currentSyllable: Syllable, nextSyllable: Syllable): void {
  const 제20항주요조건 = currentSyllable.last === 'ㄴ' && nextSyllable.first === 'ㄹ';
  const 제20항붙임조건 = nextSyllable.first === 'ㄴ';

  if (제20항주요조건) {
    currentSyllable.last = 'ㄹ';
  }

  if (제20항붙임조건) {
    if (currentSyllable.last === 'ㄹ') {
      nextSyllable.first = 'ㄹ';
    }

    if (arrayIncludes(['ㄹㅎ', 'ㄹㅌ'], currentSyllable.last)) {
      nextSyllable.first = 'ㄹ';
    }
  }
}

/**
 * 제6장 경음화를 적용합니다.
 * @description 제23항 - 받침 ‘ㄱ(ㄲ, ㅋ, ㄳ, ㄺ), ㄷ(ㅅ, ㅆ, ㅈ, ㅊ, ㅌ), ㅂ(ㅍ, ㄼ, ㄿ, ㅄ)’ 뒤에 연결되는 ‘ㄱ, ㄷ, ㅂ, ㅅ, ㅈ’은 된소리로 발음한다.
 * @description 제24항 - 어간 받침 ‘ㄴ(ㄵ), ㅁ(ㄻ)’ 뒤에 결합되는 어미의 첫소리 ‘ㄱ, ㄷ, ㅅ, ㅈ’은 된소리로 발음한다.
 * @description 제25항 - 어간 받침 ‘ㄼ, ㄾ’ 뒤에 결합되는 어미의 첫소리 ‘ㄱ, ㄷ, ㅅ, ㅈ’은 된소리로 발음한다.
 * @param currentSyllable 현재 음절을 입력합니다.
 * @param nextSyllable 다음 음절을 입력합니다.
 */
export function apply경음화(currentSyllable: Syllable, nextSyllable: Syllable): void {
  if (hasProperty(된소리, nextSyllable.first)) {
    const 제23항조건 = arrayIncludes(된소리_받침, currentSyllable.last);
    const 제24_25항조건 = arrayIncludes(어간_받침, currentSyllable.last) && nextSyllable.first !== 'ㅂ';

    if (제23항조건 || 제24_25항조건) {
      nextSyllable.first = 된소리[nextSyllable.first];
    }
  }
}

/**
 * 'ㄴ,ㄹ'이 덧나는 경우(동화작용)를 적용합니다.
 * @description 합성어에서 둘째 요소가 ‘야, 여, 요, 유, 얘, 예’ 등으로 시작되는 말이면 ‘ㄴ, ㄹ’이 덧난다
 * @link https://www.youtube.com/watch?v=Mm2JX2naqWk
 * @link http://contents2.kocw.or.kr/KOCW/data/document/2020/seowon/choiyungon0805/12.pdf
 * @param currentSyllable 현재 음절을 입력합니다.
 * @param nextSyllable 다음 음절을 입력합니다.
 */
export function applyㄴㄹ덧남(currentSyllable: Syllable, nextSyllable: Syllable) {
  const ㄴㄹ이덧나는조건 =
    currentSyllable.last &&
    nextSyllable.first === 'ㅇ' &&
    arrayIncludes(ㄴㄹ이_덧나는_후속음절_모음, nextSyllable.middle);

  if (!ㄴㄹ이덧나는조건) {
    return;
  }

  if (arrayIncludes(ㄴㄹ이_덧나는_모음, currentSyllable.middle)) {
    if (arrayIncludes(ㄴㄹ이_덧나서_받침_ㄴ_변환, currentSyllable.last)) {
      if (currentSyllable.last === 'ㄱ') {
        currentSyllable.last = 'ㅇ';
      }

      nextSyllable.first = 'ㄴ';
    }

    if (arrayIncludes(ㄴㄹ이_덧나서_받침_ㄹ_변환, currentSyllable.last)) {
      nextSyllable.first = 'ㄹ';
    }
  } else {
    // ㄴ/ㄹ이 되기 위한 조건이지만 현재 음절의 중성의 ∙(하늘)이 하나가 아닐 경우에는 덧나지 않고 연음규칙이 적용된다
    nextSyllable.first = currentSyllable.last as typeof nextSyllable.first;
  }
}
