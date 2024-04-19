import { KEYBOARD_MAP } from './constants';
import { disassembleHangul } from './disassemble';
import { hasProperty } from './utils';

/**
 * 영문 자판인 경우 한글 자판으로 치환합니다. 한글인 경우 한글 자모로 분해하고 그렇지 않은 경우 입력 문자를 반환합니다.
 * @param 한글로 변환하고자 하는 영문
 * @returns 한글 자모로 분해된 문자열
 */
export function convertAlphabetToHangul(engKeyboardText: string): string {
  return engKeyboardText
    .split('')
    .map(inputText => (hasProperty(KEYBOARD_MAP, inputText) ? KEYBOARD_MAP[inputText] : disassembleHangul(inputText)))
    .join('');
}
