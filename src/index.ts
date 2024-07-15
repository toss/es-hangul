import { assembleHangul } from './assemble';
import { chosungIncludes } from './chosungIncludes';
import { choseongIncludes } from './choseongIncludes';
import { combineHangulCharacter, combineVowels, curriedCombineHangulCharacter } from './combineHangulCharacter';
import { convertQwertyToHangul, convertQwertyToHangulAlphabet } from './convertQwertyToHangulAlphabet';
import { disassembleHangul, disassembleHangulToGroups } from './disassemble';
import { disassembleCompleteHangulCharacter } from './disassembleCompleteHangulCharacter';
import { hangulIncludes } from './hangulIncludes';
import { josa } from './josa';
import { removeLastHangulCharacter } from './removeLastHangulCharacter';
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
import { extractHangul } from './extractHangul';
import { acronymizeHangul } from './acronymizeHangul';

const hangul = {
  assembleHangul,
  chosungIncludes,
  choseongIncludes,
  combineHangulCharacter,
  combineVowels,
  curriedCombineHangulCharacter,
  convertQwertyToHangul,
  convertQwertyToHangulAlphabet,
  disassembleHangul,
  disassembleHangulToGroups,
  disassembleCompleteHangulCharacter,
  hangulIncludes,
  josa,
  removeLastHangulCharacter,
  canBeChosung,
  canBeJongsung,
  canBeJungsung,
  getChosung,
  hasBatchim,
  hasProperty,
  hasSingleBatchim,
  hasValueInReadOnlyStringList,
  extractHangul,
  acronymizeHangul,
};

export default hangul;

export {
  assembleHangul,
  chosungIncludes,
  choseongIncludes,
  combineHangulCharacter,
  combineVowels,
  curriedCombineHangulCharacter,
  convertQwertyToHangul,
  convertQwertyToHangulAlphabet,
  disassembleHangul,
  disassembleHangulToGroups,
  disassembleCompleteHangulCharacter,
  hangulIncludes,
  josa,
  removeLastHangulCharacter,
  canBeChosung,
  canBeJongsung,
  canBeJungsung,
  getChosung,
  hasBatchim,
  hasProperty,
  hasSingleBatchim,
  hasValueInReadOnlyStringList,
  extractHangul,
  acronymizeHangul,
};
