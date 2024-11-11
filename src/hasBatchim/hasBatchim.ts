import {
  COMPLETE_HANGUL_END_CHARCODE,
  COMPLETE_HANGUL_START_CHARCODE,
  JONGSEONGS,
  NUMBER_OF_JONGSEONG,
} from '@/_internal/constants';

/**
 * @name hasBatchim
 * @description
 * 한글 문자열의 마지막 글자가 받침이 있는지 확인합니다.
 * ```typescript
 * hasBatchim(
 *   // 글자에 받침이 있는지 확인하고 싶은 문자열
 *   str: string,
 *   // 옵션 객체로 only 속성을 받을 수 있습니다.
 *   options?: { only?: "single" | "double" }
 * ): boolean
 * ```
 * @example
 * hasBatchim('값') // true
 * hasBatchim('토') // false
 * hasBatchim('갑', { only: "single" }) // true
 * hasBatchim('값', { only: "single" }) // false
 * hasBatchim('값', { only: "double" }) // true
 * hasBatchim('토', { only: "double" }) // false
 */
export function hasBatchim(
  str: string,
  options?: {
    /**
     * 체크할 받침의 종류
     * 사용하지 않으면 둘다 체크합니다.
     */
    only?: 'single' | 'double';
  }
) {
  const lastChar = str[str.length - 1];

  if (lastChar == null) {
    return false;
  }
  const charCode = lastChar.charCodeAt(0);
  const isNotCompleteHangul = charCode < COMPLETE_HANGUL_START_CHARCODE || charCode > COMPLETE_HANGUL_END_CHARCODE;

  if (isNotCompleteHangul) {
    return false;
  }

  const batchimCode = (charCode - COMPLETE_HANGUL_START_CHARCODE) % NUMBER_OF_JONGSEONG;
  const batchimLength = JONGSEONGS[batchimCode].length;

  switch (options?.only) {
    case 'single': {
      return batchimLength === 1;
    }
    case 'double': {
      return batchimLength === 2;
    }
    default: {
      return batchimCode > 0;
    }
  }
}
