import { disassembleHangulToGroups } from './disassemble';
import { canBeChosung, getFirstConsonants } from './utils';

export function chosungIncludes(x: string, y: string) {
  if (!isOnlyInitialConsonant(y)) {
    return false;
  }

  const initialConsonantsX = getFirstConsonants(x).replace(/\s/g, '');
  const initialConsonantsY = getFirstConsonants(y).replace(/\s/g, '');

  return initialConsonantsX.includes(initialConsonantsY);
}

/*
 * @description 공백을 제외한 문자열이 한글초성으로만 주어진 경우
 */
function isOnlyInitialConsonant(str: string) {
  const trimStr = str.replace(/\s/g, '');

  return disassembleHangulToGroups(trimStr).every(disassembled => {
    return disassembled.length === 1 && canBeChosung(disassembled[0]);
  });
}
