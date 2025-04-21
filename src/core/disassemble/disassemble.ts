import { disassembleToGroups } from '@/disassembleToGroups';

export function disassemble(str: string) {
  return disassembleToGroups(str).reduce((hanguls, disassembleds) => `${hanguls}${disassembleds.join('')}`, '');
}
