import { disassembleHangul } from './disassemble';
import { safeParseHangul } from './_internal/hangul';

export function hangulIncludes(x: string, y: string) {
  const parsedX = safeParseHangul(x);
  const parsedY = safeParseHangul(y);

  if (!(parsedX.success && parsedY.success)) {
    return y.length === 0;
  }

  const disassembledX = disassembleHangul(parsedX.data);
  const disassembledY = disassembleHangul(parsedY.data);

  return disassembledX.includes(disassembledY);
}
