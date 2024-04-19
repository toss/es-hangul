import { disassembleHangul } from './disassemble';
import { binaryAssembleHangul } from './_internal/hangul';

export function assembleHangul(words: string[]) {
  const disassembled = disassembleHangul(words.join('')).split('');
  return disassembled.reduce(binaryAssembleHangul);
}
