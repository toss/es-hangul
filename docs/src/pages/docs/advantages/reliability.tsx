import coverageJSON from '../../../../../coverage/coverage-summary.json';

type Locale = 'ko' | 'en';

interface TypeSupportTableProps {
  locale: Locale;
}

export default function Reliability({ locale }: TypeSupportTableProps) {
  const isKorean = locale === 'ko';
  const statements = isKorean ? '문장' : 'Statements';
  const branches = isKorean ? '브랜치' : 'Branches';
  const functions = isKorean ? '함수' : 'Functions';
  const lines = isKorean ? '라인' : 'Lines';

  const { total: totalCoverage, ...fileEntries } = coverageJSON;

  const filteredCoverage = (coverageFileEntries: typeof fileEntries, openAPIList: typeof deduplicationAPIList) => {
    return Object.entries(coverageFileEntries)
      .filter(([filePath]) => {
        const fileNameWithoutExt = filteredFilePath(filePath);

        if (!fileNameWithoutExt) {
          return false;
        }

        return filteredFileName(fileNameWithoutExt, openAPIList);
      })
      .map(([filePath, coverage]) => {
        const fileNameWithoutExt = filteredFilePath(filePath);

        return [fileNameWithoutExt, coverage] as const;
      });
  };

  const filteredFilePath = (filePath: string) => {
    const segments = filePath.split('/');
    const lastSegment = segments[segments.length - 1];

    if (!lastSegment.endsWith('.ts')) {
      return '';
    }

    return lastSegment.replace(/\.ts$/, '');
  };

  const filteredFileName = (fileNameWithoutExt: string, openAPIList: typeof deduplicationAPIList) => {
    return openAPIList.some(api => {
      if (fileNameWithoutExt === api) {
        return true;
      }

      if (fileNameWithoutExt.startsWith(api) && fileNameWithoutExt.length > api.length) {
        const nextChar = fileNameWithoutExt.charAt(api.length);

        return nextChar === nextChar.toUpperCase() && nextChar !== nextChar.toLowerCase();
      }

      return false;
    });
  };

  return (
    <div>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <caption className="caption-top text-sm">
            {isKorean ? 'es-hangul의 테스트 커버리지 항목' : "es-hangul's test coverage item"}
          </caption>

          <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                {isKorean ? '테스트 커버리지 항목' : 'Test coverage item'}
              </th>
              <th scope="col" className="px-6 py-3">
                {isKorean ? '커버리지 비율' : 'Coverage percentage'}
              </th>
            </tr>
          </thead>

          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {statements}
                <br />
                <span className="text-gray-500 text-xs">
                  ℹ️&nbsp;
                  {isKorean
                    ? '코드에서 실행 가능한 모든 문장이 테스트에서 실행되었는지'
                    : 'Whether all executable statements in the code have been executed during testing'}
                </span>
              </th>
              <td className="px-6 py-4">✅ ({totalCoverage.statements.pct}%)</td>
            </tr>

            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {branches}
                <br />
                <span className="text-gray-500 text-xs">
                  ℹ️&nbsp;
                  {isKorean
                    ? '조건문(if, else, switch 등)에서 발생하는 모든 분기 경로가 테스트되었는지'
                    : 'Whether all branching paths in conditional statements (if, else, switch, etc.) have been tested'}
                </span>
              </th>
              <td className="px-6 py-4">✅ ({totalCoverage.branches.pct}%)</td>
            </tr>

            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {functions}
                <br />
                <span className="text-gray-500 text-xs">
                  ℹ️&nbsp;
                  {isKorean
                    ? '코드 내의 모든 함수가 테스트에서 호출되었는지'
                    : 'Whether all functions within the code have been called during testing'}
                </span>
              </th>
              <td className="px-6 py-4">✅ ({totalCoverage.functions.pct}%)</td>
            </tr>

            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {lines}
                <br />
                <span className="text-gray-500 text-xs">
                  ℹ️&nbsp;
                  {isKorean
                    ? '소스 코드의 각 라인이 테스트에서 실행되었는지'
                    : 'Whether each line of the source code has been executed during testing'}
                </span>
              </th>
              <td className="px-6 py-4">✅ ({totalCoverage.lines.pct}%)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <caption className="caption-top text-sm">
            {isKorean
              ? 'es-hangul의 테스트 커버리지 현황 📆 2024.12.03'
              : "es-hangul's test coverage status 📆 2024.12.03"}
          </caption>

          <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                API
              </th>
              <th scope="col" className="px-6 py-3">
                {statements}
              </th>
              <th scope="col" className="px-6 py-3">
                {branches}
              </th>
              <th scope="col" className="px-6 py-3">
                {functions}
              </th>
              <th scope="col" className="px-6 py-3">
                {lines}
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredCoverage(fileEntries, deduplicationAPIList).map(([api, coverage]) => (
              <tr key={api} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <a href={`../api/${api}`}>{api} 🔗</a>
                </th>

                <td className="px-6 py-4">✅ ({coverage.statements.pct}%)</td>
                <td className="px-6 py-4">✅ ({coverage.branches.pct}%)</td>
                <td className="px-6 py-4">✅ ({coverage.functions.pct}%)</td>
                <td className="px-6 py-4">✅ ({coverage.lines.pct}%)</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const deduplicationAPIList = [
  'amountToHangul',
  'assemble',
  'canBe',
  'combine',
  'convertQwerty',
  'days',
  'disassemble',
  'getChoseong',
  'hasBatchim',
  'josa',
  'numberToHangul',
  'removeLastCharacter',
  'romanize',
  'standardizePronunciation',
  'susa',
] as const;
