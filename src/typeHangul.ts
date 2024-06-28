import { isHangulCharacter } from './_internal/hangul';
import { assembleHangul } from './assemble';
import { disassembleHangulToGroups } from './disassemble';

export async function* typeHangul(
  target: string,
  options?: { speed?: number; initial?: string; decomposeOnBackward?: boolean }
) {
  const { speed = 50, initial = '', decomposeOnBackward = true } = options ?? {};

  if (initial === target) {
    throw Error(`'${initial}' and '${target}'`);
  }

  const disassembledInitial = initial.length === 0 ? [] : disassembleHangulToGroups(initial).flat();
  const disassembledTarget = disassembleHangulToGroups(target).flat();

  const isBackward = disassembledTarget.length < disassembledInitial.length;

  const [shorter, longer] = isBackward
    ? [disassembledTarget, disassembledInitial]
    : [disassembledInitial, disassembledTarget];

  if (shorter.some((alphabet, idx) => alphabet !== longer[idx])) {
    throw Error(`'${initial}' can't be typed as ${target}`);
  }

  if (isBackward && !decomposeOnBackward && !isHangulCharacter([...target].reverse()[0])) {
    throw Error(
      `'options.decomposeOnBackward' is set to false, but the last character of 'target'(${target}) is not a complete character`
    );
  }

  if (isBackward && decomposeOnBackward) {
    for (let i = longer.length; i >= shorter.length; i--) {
      await new Promise(resolve => setTimeout(resolve, speed));

      yield i === 0 ? '' : assembleHangul(longer.slice(0, i));
    }
  } else if (isBackward) {
    for (let i = initial.length; i >= target.length; i--) {
      await new Promise(resolve => setTimeout(resolve, speed));

      yield initial.slice(0, i);
    }
  } else {
    for (let i = shorter.length; i <= longer.length; i++) {
      await new Promise(resolve => setTimeout(resolve, speed));

      yield i === 0 ? '' : assembleHangul(longer.slice(0, i));
    }
  }
}
