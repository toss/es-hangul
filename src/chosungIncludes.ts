import { disassembleHangulToGroups } from './disassemble';
import { canBeChosung, getFirstConsonants } from './utils';

export function chosungIncludes(x: string, y: string) {
  const trimmedY = y.replace(/\s/g, '');

  if (!isOnlyChosung(trimmedY)) {
    return false;
  }

  const chosungX = getFirstConsonants(x).replace(/\s/g, '');
  const chosungY = trimmedY;

  return chosungX.includes(chosungY);
}

/*
 * @description 문자열이 한글초성으로만 주어진 경우
 */
function isOnlyChosung(str: string) {
  const groups = disassembleHangulToGroups(str);
  if (groups.length === 0) {
    return false;
  }

  return groups.every(disassembled => {
    return disassembled.length === 1 && canBeChosung(disassembled[0]);
  });
}
