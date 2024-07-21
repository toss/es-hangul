export function excludeLastElement(array: string[]): [string[], string] {
  const lastElement = array[array.length - 1];
  return [array.slice(0, -1), lastElement ?? ''];
}

export function joinString(...args: string[]) {
  return args.join('');
}

export function isBlank(character: string) {
  return /^\s$/.test(character);
}

export default function assert(condition: boolean, errorMessage?: string): asserts condition {
  if (condition === false) {
    throw new Error(errorMessage ?? 'Invalid condition');
  }
}

export function hasValueInReadOnlyStringList<T extends string>(list: readonly T[], value: string): value is T {
  return list.some(item => item === value);
}

export function hasProperty<T extends object, K extends PropertyKey>(obj: T, key: K): key is K & keyof T {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
