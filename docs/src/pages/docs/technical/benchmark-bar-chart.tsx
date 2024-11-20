import { useEffect, useRef, useState } from 'react';

const ANIMATION_THRESHOLD = 0.3;

interface BenchmarkBarChart {
  locale: 'ko' | 'en';
}

export const BenchmarkBarChart = ({ locale }: BenchmarkBarChart) => {
  const [filledPercentages, setFilledPercentages] = useState<number[]>(benchmarkData.map(() => 0));
  const [isVisible, setIsVisible] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= ANIMATION_THRESHOLD) {
          setIsVisible(true);
        }
      },
      { threshold: ANIMATION_THRESHOLD }
    );

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    return () => {
      if (chartRef.current) {
        observer.unobserve(chartRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const maximum = Math.max(...benchmarkData.map(data => data.operationsPerSecond));

    if (isVisible) {
      setFilledPercentages(benchmarkData.map(data => (data.operationsPerSecond / maximum) * 100));
    }
  }, [isVisible]);

  const isKorean = locale === 'ko';

  return (
    <div
      ref={chartRef}
      className="flex flex-col items-center w-full p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md"
    >
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">
        <span className="text-blue-600 dark:text-blue-400">Lightning Fast</span>
      </h1>

      <div className="space-y-3 w-full max-w-xl">
        {benchmarkData.map((data, index) => (
          <div key={data.name} className="flex flex-col">
            <div className="flex justify-between items-center mb-1">
              <span
                className={`text-lg font-medium ${
                  data.status === 'fastest' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-800 dark:text-gray-300'
                }`}
              >
                {data.name}
              </span>

              {data.name === 'es-hangul' && (
                <span className="text-sm text-green-500">fastest</span> // status는 es-hangul에만 표시
              )}
            </div>
            <div className="relative h-4 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`absolute top-0 left-0 h-full rounded-full ${
                  data.name === 'es-hangul'
                    ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'
                    : 'bg-blue-200'
                }`}
                style={{
                  width: `${filledPercentages[index]}%`,
                  transition: 'width 1.5s ease-in-out',
                }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
              {isKorean ? (
                <>
                  <span>작업 처리량: {data.operationsPerSecond.toLocaleString()} ops/sec</span>
                  <span>1000만 건 처리 시간: {data.timeToProcess}초</span>
                </>
              ) : (
                <>
                  <span>Throughput: {data.operationsPerSecond.toLocaleString()} ops/sec</span>
                  <span>Processing time for 10 million records: {data.timeToProcess} seconds</span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 mb-4 italic">
        {isKorean ? '* josa 함수를 기준으로 측정하였습니다.' : '* Measurements were based on the `josa` function.'}
      </p>

      <a
        href="https://github.com/toss/es-hangul/tree/main/benchmarks"
        target="_blank"
        rel="noopener noreferrer"
        className="relative mt-8 px-6 py-3 rounded-full text-white text-lg font-semibold shadow-md transition-all duration-200 group"
      >
        <span
          className="absolute inset-2 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
    opacity-75 blur-sm group-hover:blur-md group-hover:opacity-100 transition-all duration-300"
          aria-hidden="true"
        ></span>
        <span
          className="relative block px-8 py-3 bg-gray-800 rounded-full text-white dark:bg-gray-700
    group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600 transition-all duration-300"
        >
          {isKorean ? '더 자세한 벤치마크 결과 보기' : 'See more detailed benchmark results'}
        </span>
      </a>
    </div>
  );
};

const 천만 = 10000000;
const benchmarkData = [
  {
    name: 'es-hangul',
    operationsPerSecond: 11199038,
    timeToProcess: (천만 / 11199038).toFixed(2),
    status: 'fastest',
  },
  {
    name: 'auto-josa',
    operationsPerSecond: 8512551,
    timeToProcess: (천만 / 8512551).toFixed(2),
  },
  {
    name: 'josa',
    operationsPerSecond: 3334947,
    timeToProcess: (천만 / 3334947).toFixed(2),
  },
];
