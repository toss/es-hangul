export function excludeLastElement(array: string[]): [string[], string] {
  const lastElement = array.at(-1);
  return [array.slice(0, -1), lastElement ?? ''];
}

export function joinString(...args: string[]) {
  return args.join('');
}
