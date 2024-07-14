import { disassemble } from './disassemble';

export function hangulIncludes(x: string, y: string) {
  const disassembledX = disassemble(x);
  const disassembledY = disassemble(y);

  return disassembledX.includes(disassembledY);
}
