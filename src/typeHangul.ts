import { isHangulCharacter } from './_internal/hangul';
import { assembleHangul } from './assemble';
import { disassembleHangulToGroups } from './disassemble';

type TypingOptions = { speed?: number; initial?: string; decomposeOnBackward?: boolean };

export async function* typeHangul(target: string, options?: TypingOptions) {
  const { speed = 50, initial = '', decomposeOnBackward = true } = options ?? {};

  if (initial === target) {
    throw Error(`The initial value and the target are the same ('${initial}')`);
  }

  const disassembledInitial = initial.length === 0 ? [] : disassembleHangulToGroups(initial).flat();
  const disassembledTarget = disassembleHangulToGroups(target).flat();

  const isBackward = disassembledTarget.length < disassembledInitial.length;

  const [shorter, longer] = isBackward
    ? [disassembledTarget, disassembledInitial]
    : [disassembledInitial, disassembledTarget];

  if (shorter.some((alphabet, idx) => alphabet !== longer[idx])) {
    throw Error(`'${initial}' can't be typed as '${target}'`);
  }

  if (isBackward && !decomposeOnBackward && target.length > 0 && !initial.includes(target)) {
    throw Error(
      `'options.decomposeOnBackward' is set to false, but the last character of 'target'(${target}) is not a complete character for 'initial'(${initial})`
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

export type TypingEventListener = (value: string, info: { from: string; to: string; isReset: boolean }) => void;

export function getTypewriterHangul(initial = '') {
  let _current = initial;
  let _listeners: TypingEventListener[] = [];

  const onType = (callback: TypingEventListener) => {
    _listeners.push(callback);

    return () => {
      _listeners = _listeners.filter(listener => listener !== callback);
    };
  };

  const _callListeners = (from: string, to: string, isReset: boolean) =>
    _listeners.forEach(listener => listener.call(null, _current, { from, to, isReset }));

  const type = async (target: string, options?: Omit<TypingOptions, 'initial'>) => {
    const from = _current;
    const typeHangulGenerator = typeHangul(target, { ...options, initial: _current });

    for await (const value of typeHangulGenerator) {
      _current = value;
      _callListeners(from, target, false);
    }
  };

  const reset = (value = initial) => {
    const from = _current;
    _current = value;
    _callListeners(from, value, true);
  };

  return {
    onType,
    type,
    reset,
  };
}
