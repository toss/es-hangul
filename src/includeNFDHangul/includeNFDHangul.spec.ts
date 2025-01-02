import { includeNFDHangul } from './includeNFDHangul';

describe('includeNFDHangul', () => {
  it('한글이 포함된 텍스트가 아니라면 false', () => {
    expect(includeNFDHangul('123')).toBe(false);
    expect(includeNFDHangul('Hello world')).toBe(false);
  });

  it('NFC 정규화 한글은 false', () => {
    expect(includeNFDHangul('나라의 말이')).toBe(false);
    expect(includeNFDHangul('토스 최고')).toBe(false);
  });

  it('NFD 정규화 한글은 true', () => {
    const withNFD = decodeURI(
      '%5B3%20Fl.+Pf.%5D%20%E1%84%92%E1%85%A1%E1%84%8B%E1%85%AE%E1%86%AF%E1%84%8B%E1%85%B4%20%E1%84%8B%E1%85%AE%E1%86%B7%E1%84%8C%E1%85%B5%E1%86%A8%E1%84%8B%E1%85%B5%E1%84%82%E1%85%B3%E1%86%AB%20%E1%84%89%E1%85%A5%E1%86%BC_%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A2%E1%86%BC%E1%84%8B%E1%85%B4%20%E1%84%92%E1%85%AC%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%86%E1%85%A9%E1%86%A8%E1%84%86%E1%85%A1%20-%20Flute%20I.pdf'
    );

    expect(includeNFDHangul(withNFD)).toBe(true);
    expect(includeNFDHangul('나랏〮말〯ᄊᆞ미〮')).toBe(true);
  });
});
