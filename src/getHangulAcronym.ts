import { isHangul } from './_internal/hangul';

/**
 *
 * @param getHangulAcronym
 * @description
 * 한글 문장을 입력받아서, 해당 한글 문장의 초성을을 리턴해줍니다.
 * 한글 문장이 아닌, 문장은 취급하지않습니다. 추가로 한글 문장 + 영어 문장의 경우에도 취급하지않습니다.
 */
export function getHangulAcronym(hangul: string) {
  if (!isHangul(text)) {
    throw new Error('Invalid Hangul text, please input Hangul text only.');
  }

  const words = text.split(' ');

  const firstHangulLetters = words.map(word => word.charAt(0));

  return firstHangulLetters;
}
