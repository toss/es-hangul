// 한글의 구조를 직접 다루는 기능
// 자모 단위의 분해/조합 및 자모 사용 가능성 판단 등을 포함합니다.
export { assemble } from './assemble';
export { disassemble } from './disassemble';
export { disassembleCompleteCharacter } from './disassembleCompleteCharacter';
export { disassembleToGroups } from './disassembleToGroups';
export { combineCharacter } from './combineCharacter';
export { combineVowels } from './combineVowels';
export { getChoseong } from './getChoseong';
export { canBeChoseong } from './canBeChoseong';
export { canBeJungseong } from './canBeJungseong';
export { canBeJongseong } from './canBeJongseong';
export { removeLastCharacter } from './removeLastCharacter';
export { josa } from './josa';
export { hasBatchim } from './hasBatchim'; 