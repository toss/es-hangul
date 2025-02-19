export function includeNFDHangul(str: string): boolean {
  return /[\u1100-\u11FF]/.test(String(str));
}
