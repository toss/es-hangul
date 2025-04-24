import { hasProperty } from '@/_internal';
import { QWERTY_KEYBOARD_MAP } from './constants';

/**
 * @name convertQwertyToAlphabet
 * @description
 * 영어 알파벳을 qwerty 자판과 매칭되는 한글 음소로 변환합니다.
 * @param word 한글 음소로 변환하고자 하는 영문
 * @returns 영어 알파벳이 포함되지 않은 한글 음소, 음절, 기타 문자로 이루어진 문자열
 */
export function convertQwertyToAlphabet(word: string): string {
  return word
    .split('')
    .map(inputText => (hasProperty(QWERTY_KEYBOARD_MAP, inputText) ? QWERTY_KEYBOARD_MAP[inputText] : inputText))
    .join('');
}
