import { includeOldHangul } from './includeOldHangul';

describe('includeOldHangul', () => {
  it('한글이 포함된 텍스트가 아니라면 false', () => {
    expect(includeOldHangul('123')).toBe(false);
    expect(includeOldHangul('Hello world')).toBe(false);
  });

  it('(NFC 정규화) 한글이 포함됐어도 현대한글만 있다면 false', () => {
    expect(includeOldHangul('나라의 말이')).toBe(false);
    expect(includeOldHangul('토스 최고')).toBe(false);
  });

  it('(NFD 정규화) 한글이 포함됐어도 현대한글만 있다면 true', () => {
    const withNFD = decodeURI(
      '%5B3%20Fl.+Pf.%5D%20%E1%84%92%E1%85%A1%E1%84%8B%E1%85%AE%E1%86%AF%E1%84%8B%E1%85%B4%20%E1%84%8B%E1%85%AE%E1%86%B7%E1%84%8C%E1%85%B5%E1%86%A8%E1%84%8B%E1%85%B5%E1%84%82%E1%85%B3%E1%86%AB%20%E1%84%89%E1%85%A5%E1%86%BC_%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A2%E1%86%BC%E1%84%8B%E1%85%B4%20%E1%84%92%E1%85%AC%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%86%E1%85%A9%E1%86%A8%E1%84%86%E1%85%A1%20-%20Flute%20I.pdf'
    );

    expect(includeOldHangul(withNFD)).toBe(false);
  });

  it('현대에는 사용하지 않는 한글이 포함되어 있다면 true', () => {
    expect(includeOldHangul('나랏〮말〯ᄊᆞ미〮')).toBe(true);
  });
});
