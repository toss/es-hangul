import { disassembleHangulToGroups } from './disassemble';
import { canBeChosung } from './utils';

/*
 * @description 문자열이 한글초성으로만 주어진 경우
 */
export function isOnlyChosung(str: string) {
  const groups = disassembleHangulToGroups(str);
  if (groups.length === 0) {
    return false;
  }

  return groups.every(disassembled => {
    return disassembled.length === 1 && canBeChosung(disassembled[0]);
  });
}
