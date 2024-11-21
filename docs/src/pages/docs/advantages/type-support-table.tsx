type Locale = 'ko' | 'en';

interface TypeSupportTableProps {
  locale: Locale;
}

export default function TypeSupportTable({ locale }: TypeSupportTableProps) {
  const isKorean = locale === 'ko';
  const fully = isKorean ? '100% 지원' : '100% Supported';
  const partial = isKorean ? '일부 지원' : 'Partially Supported';
  const unsupported = isKorean ? '미지원' : 'Unsupported';

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <caption className="caption-top text-sm">
          {isKorean
            ? 'es-hangul, josa, hangul-js의 타입 시스템 비교'
            : 'Comparison of the type systems of es-hangul, josa, and hangul-js'}
        </caption>

        <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              {isKorean ? '라이브러리' : 'Library'}
            </th>
            <th scope="col" className="px-6 py-3">
              es-hangul
            </th>
            <th scope="col" className="px-6 py-3">
              josa
            </th>
            <th scope="col" className="px-6 py-3">
              hangul-js
            </th>
          </tr>
        </thead>

        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {isKorean ? '개발 언어' : 'Language'}
            </th>
            <td className="px-6 py-4">TypeScript</td>
            <td className="px-6 py-4">JavaScript</td>
            <td className="px-6 py-4">JavaScript</td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {isKorean ? 'TypeScript 지원 여부' : 'TypeScript support status'}
            </th>
            <td className="px-6 py-4">✅ ({fully})</td>
            <td className="px-6 py-4">
              ⚠️ (
              <a className="text-gray-400" href="https://www.npmjs.com/package/@types/josa" target="_blank">
                {isKorean ? '서드파티 제공' : 'Supported by third-party'}
              </a>
              )
            </td>
            <td className="px-6 py-4">⚠️ ({partial})</td>
          </tr>

          <tr className="bg-white dark:bg-gray-800">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {isKorean ? '강력한 타입 시스템 제공' : 'Provide a strong type system'}
            </th>
            <td className="px-6 py-4">✅ ({fully})</td>
            <td className="px-6 py-4">⚠️ ({partial})</td>
            <td className="px-6 py-4">⚠️ ({partial})</td>
          </tr>

          <tr className="bg-white dark:bg-gray-800">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {isKorean ? '명확한 입력/출력 타입 제공' : 'Offer clear input/output types'}
            </th>
            <td className="px-6 py-4">✅ ({fully})</td>
            <td className="px-6 py-4">⚠️ ({partial})</td>
            <td className="px-6 py-4">❌ ({unsupported})</td>
          </tr>

          <tr className="bg-white dark:bg-gray-800">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {isKorean ? '주기적인 타입 업데이트' : 'Regular type updates'}
            </th>
            <td className="px-6 py-4">✅ ({fully})</td>
            <td className="px-6 py-4">❌ ({unsupported})</td>
            <td className="px-6 py-4">❌ ({unsupported})</td>
          </tr>

          <tr className="bg-white dark:bg-gray-800">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {isKorean ? 'IDE 자동 완성 지원' : 'Support IDE auto-completion'}
            </th>
            <td className="px-6 py-4">✅ ({fully})</td>
            <td className="px-6 py-4">⚠️ ({partial})</td>
            <td className="px-6 py-4">❌ ({unsupported})</td>
          </tr>
        </tbody>
      </table>

      <figure className="mt-12">
        <figcaption className="mt-2 text-sm text-center text-gray-500">
          {isKorean ? 'es-hangul의 강력한 타입 시스템' : 'The powerful type system of es-hangul'}
        </figcaption>

        <video className="rounded-lg" width="100%" autoPlay muted preload="metadata" loop>
          <source src="/videos/type_support.mp4" type="video/mp4"></source>
        </video>
      </figure>
    </div>
  );
}
