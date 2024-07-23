import { isOnlyChoseong } from './choseongIncludes';
import { getChoseong } from './getChoseong';

/**
 * @deprecated choseongIncludes를 사용해 주세요.
 */
export function chosungIncludes(x: string, y: string) {
  const trimmedY = y.replace(/\s+/g, '');

  if (!isOnlyChoseong(trimmedY)) {
    return false;
  }

  const choseongX = getChoseong(x).replace(/\s/g, '');
  const choseongY = trimmedY;

  return choseongX.includes(choseongY);
}
