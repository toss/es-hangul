import { hasProperty } from '@/_internal';
import { disassemble } from '@/core/disassemble';
import { HANGUL_TO_QWERTY_KEYBOARD_MAP } from './constants';

/**
 * @name convertHangulToQwerty
 * @description
 * 한글을 qwerty 자판과 매칭되는 영어 알파벳으로 변환합니다.
 * @param word 영문으로 변환하고자 하는 한글
 * @returns 한글을 규칙에 맞게 qwerty 자판의 영어 알파벳으로 변환한 문자열
 * @example
 * convertHangulToQwerty('겨노'); // 'rush'
 * convertHangulToQwerty('쨰ㅉ'); // 'WOW'
 * convertHangulToQwerty('FE개발!'); // 'FEroqkf!'
 * convertHangulToQwerty('ㅇPdml'); // 'dPdml'
 * convertHangulToQwerty(''); // ''
 */
export function convertHangulToQwerty(word: string): string {
  if (!word) {
    return '';
  }
  return disassemble(word)
    .split('')
    .map((inputText: string) =>
      hasProperty(HANGUL_TO_QWERTY_KEYBOARD_MAP, inputText) ? HANGUL_TO_QWERTY_KEYBOARD_MAP[inputText] : inputText
    )
    .join('');
}
