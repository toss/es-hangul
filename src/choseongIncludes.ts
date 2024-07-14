import { disassembleToGroups } from './disassemble';
import { canBeChoseong, getChoseong } from './utils';

export function choseongIncludes(x: string, y: string) {
  const trimmedY = y.replace(/\s/g, '');

  if (!isOnlyChoseong(trimmedY)) {
    return false;
  }

  const choseongX = getChoseong(x).replace(/\s/g, '');
  const choseongY = trimmedY;

  return choseongX.includes(choseongY);
}

/*
 * @description 문자열이 한글초성으로만 주어진 경우
 */
export function isOnlyChoseong(str: string) {
  const groups = disassembleToGroups(str);
  if (groups.length === 0) {
    return false;
  }

  return groups.every(disassembled => {
    return disassembled.length === 1 && canBeChoseong(disassembled[0]);
  });
}
