import { replaceNFDHangulToNFCHangul } from './replaceNFDHangulToNFCHangul';

describe('replaceNFDHangulToNFCHangul', () => {
  it('should return str if str does not include NFD Hangul', () => {
    const str = 'abc';
    const result = replaceNFDHangulToNFCHangul(str);
    expect(result).toBe(str);
  });

  it('should throw error if str includes old Hangul', () => {
    const str = '나랏〮말〯ᄊᆞ미〮';
    expect(() => replaceNFDHangulToNFCHangul(str)).toThrowError();
  });

  it('should replace NFD Hangul to NFC Hangul', () => {
    const withNFC = '[3 Fl.+Pf.] 하울의 움직이는 성_인생의 회전목마 - Flute I.pdf';

    // Same content as withNFC but normalized in NFD.
    const withNFD = decodeURI(
      '%5B3%20Fl.+Pf.%5D%20%E1%84%92%E1%85%A1%E1%84%8B%E1%85%AE%E1%86%AF%E1%84%8B%E1%85%B4%20%E1%84%8B%E1%85%AE%E1%86%B7%E1%84%8C%E1%85%B5%E1%86%A8%E1%84%8B%E1%85%B5%E1%84%82%E1%85%B3%E1%86%AB%20%E1%84%89%E1%85%A5%E1%86%BC_%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A2%E1%86%BC%E1%84%8B%E1%85%B4%20%E1%84%92%E1%85%AC%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%86%E1%85%A9%E1%86%A8%E1%84%86%E1%85%A1%20-%20Flute%20I.pdf'
    );

    expect(withNFD).not.toBe(withNFC);
    expect(replaceNFDHangulToNFCHangul(withNFD)).toBe(withNFC);
  });
});
