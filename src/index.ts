import { assemble } from './assemble';
import { chosungIncludes } from './chosungIncludes';
import { choseongIncludes } from './choseongIncludes';
import { combineCharacter, combineVowels, curriedcombineCharacter } from './combineCharacter';
import { convertQwerty, convertQwertyToAlphabet } from './convertQwertyToAlphabet';
import { disassemble, disassembleToGroups } from './disassemble';
import { disassembleCompleteCharacter } from './disassembleCompleteCharacter';
import { josa } from './josa';
import { removeLastCharacter } from './removeLastCharacter';
import {
  canBeChosung,
  canBeJongsung,
  canBeJungsung,
  getChosung,
  hasBatchim,
  hasProperty,
  hasSingleBatchim,
  hasValueInReadOnlyStringList,
} from './utils';

const hangul = {
  assemble,
  chosungIncludes,
  choseongIncludes,
  combineCharacter,
  combineVowels,
  curriedcombineCharacter,
  convertQwerty,
  convertQwertyToAlphabet,
  disassemble,
  disassembleToGroups,
  disassembleCompleteCharacter,
  josa,
  removeLastCharacter,
  canBeChosung,
  canBeJongsung,
  canBeJungsung,
  getChosung,
  hasBatchim,
  hasProperty,
  hasSingleBatchim,
  hasValueInReadOnlyStringList,
};

export default hangul;

export {
  assemble,
  chosungIncludes,
  choseongIncludes,
  combineCharacter,
  combineVowels,
  curriedcombineCharacter,
  convertQwerty,
  convertQwertyToAlphabet,
  disassemble,
  disassembleToGroups,
  disassembleCompleteCharacter,
  josa,
  removeLastCharacter,
  canBeChosung,
  canBeJongsung,
  canBeJungsung,
  getChosung,
  hasBatchim,
  hasProperty,
  hasSingleBatchim,
  hasValueInReadOnlyStringList,
};
